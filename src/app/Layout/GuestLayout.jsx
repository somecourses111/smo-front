import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuthContext from '../Auth/AuthContext'
import logo from '../../_metronic/assets/Img/Logo/logo.png'
import { Loading } from '../pages/LoadingPage/Loading'

const GuestLayout = () => {
    const {user} = useAuthContext()
    return user !== 0 ? 
    !user ?   <Loading />  :  <Navigate to='/'/>
    : <Outlet/>

   


}

export default GuestLayout