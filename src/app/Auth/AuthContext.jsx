import { createContext, useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from '../api/axios'
import axiosInstance from '../api/axios'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const [user, setUser] = useState(null)
  const [roles, setRoles] = useState(null)

  const [ready, setReady] = useState(0)

  async function TokenSave(key, value) {
    console.log([key, value])
    localStorage.setItem(key, value)
    axios.defaults.headers.common['Authorization'] = `Bearer ${value}`
  }


  const getUser = async () => {
    try {
      const { data } = await axiosInstance.get('/user')
      setUser(data.data.user)
      setRoles(data.data.roles)

      // if (!data.roles.includes('browse-dashboard') && !data.roles.includes('*')) {
      //   logout()
      // }
    } catch (e) {
      setUser(0)
    }
    get_data_web()
  }
  console.log(user);
  

  const get_data_web = async () => {
    return ;
    const { data } = await axiosInstance.get('/get-web-details', {
      params: {
        type: 'web',
      },
    })
    localStorage.setItem('web_name', data.name_en)
    localStorage.setItem('web_img', data.img)
  }

  const check_role = (role) => {
    if ((role && roles.includes(role)) || roles.includes('*')) {
      return true
    } else {
      return false
    }
  }

  const formatNumber = (number) => {
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + 'm'; // Converts to millions (e.g. 10m)
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + 'k'; // Converts to thousands (e.g. 10k)
    } else {
      return number.toFixed(2).toString(); // Return the number itself if less than 1000
    }
  };
  //logout
  const logout = () => {
    axiosInstance.get(`/sign-out`).then((response) => {
      localStorage.removeItem('')
      setUser(0)
      navigate('/login')
    })
  }


  useEffect(() => {
    if (!user) {
      getUser()
    }
  }, [])

  useEffect(() => {
    setReady(0)
  }, [location])

  return (
    <AuthContext.Provider
      value={{
        user,
        getUser,
        logout,
        csrf,
        TokenSave,
        setReady,
        ready,
        get_data_web,
        check_role,
        formatNumber
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuthContext() {
  return useContext(AuthContext)
}
