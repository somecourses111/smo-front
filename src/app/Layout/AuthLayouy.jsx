import { Navigate, Outlet } from "react-router-dom"
import logo from '../../_metronic/assets/Img/Logo/logo.png'

import useAuthContext from "../Auth/AuthContext"
import { Loading } from "../pages/LoadingPage/Loading"

const AuthLayouy = () => {
    const {user} = useAuthContext()
    return user !== 0 ? 
        !user ?  <Loading /> 
            : 
            <Outlet/> 
    : <Navigate to='/login'/>
}

export default AuthLayouy