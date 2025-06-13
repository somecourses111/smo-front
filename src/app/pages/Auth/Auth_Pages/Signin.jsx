import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FormControl, TextField } from '@mui/material';
import ReCAPTCHA from "react-google-recaptcha";
import Swal from 'sweetalert2';
import useAuthContext from '../../../Auth/AuthContext';
import axiosInstance from '../../../api/axios';
import { Loading } from '../../LoadingPage/Loading';

const Signin = () => {
  const { TokenSave, getUser } = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState([]);
  const [security, setSecurity] = useState(null)
  const navigate = useNavigate()

  const onChange = (e) => {
    setSecurity(e)
  }

 
 
  const handleLogin = async (event) => {
    event.preventDefault()
    setLoading(true)
    setErrors([])
    try {
      const response = await axiosInstance.post('/login', {
        username: email,
        password: password
       })
      TokenSave('access_token', response.data.data.token)
      getUser()
      navigate('/')
    } catch (e) {
      console.log(e);
      setLoading(false)
      setErrors(e.response.data.errors)
      Swal.fire({
        title: "Sorry",
        text: Object.values(e.response.data.errors)[0],
        icon: "error",
      })

    }

  }

  return loading ? <Loading /> :
    <form className="row flex-center" onSubmit={handleLogin}>
      <div className="row flex-start">
        <img src={process.env.REACT_APP_IMAGE_PATH + (localStorage.getItem('web_img') ?? '')} className='w-200px w-md-50 w-xl-200px me-3' alt="" />
      </div>
      {/* <h3 className='text-center text_liltel_dark f-boold_700 Inter'>Sign in</h3> */}

      <div className='fv-row col-11 mt-4' >
        <FormControl fullWidth>
          <TextField id="outlined-basic" label='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined" autoComplete='off'
            type='text'
          />
        </FormControl>
        {errors.Email &&
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{errors.Email}</span>
            </div>
          </div>
        }
      </div>
      <div className='fv-row col-11 mt-4'>
        <FormControl fullWidth>
          <TextField id="outlined-basic" label='Password *'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined" autoComplete='off'
            type='password'
          />
        </FormControl>
        {errors.password &&
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{errors.password}</span>
            </div>
          </div>
        }
      </div>
      <div className='fv-row col-11 mt-4'>
        <button type='submit' className="login  w-100" >
          {!loading && <span className='indicator-label'>Sign In</span>}
          {loading && (
            <span className='indicator-progress' style={{ display: 'block' }}>
              Please wait...{' '}
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      </div>
    </form>
}


 

export default Signin