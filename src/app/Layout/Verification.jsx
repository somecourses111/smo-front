import React from 'react'
import { Navigate, Outlet } from "react-router-dom"
import useAuthContext from "../Auth/AuthContext"
import logo from '../../_metronic/assets/Img/Logo/logo.png'
import { Loading } from '../pages/LoadingPage/Loading'

const Verification = () => {
  const {user } = useAuthContext()
  return user !== 0 ? 
      !user ?   <Loading /> 
          : 
          user.email_verified_at ? 
        <Navigate to='/' />
        :
        <Outlet/>  
       
  : <Navigate to='/login'/>
}
export default Verification