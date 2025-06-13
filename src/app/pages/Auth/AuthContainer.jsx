import { GoogleOAuthProvider } from '@react-oauth/google'
import React, { useState } from 'react'
import { Loading } from '../LoadingPage/Loading';
import { Outlet } from 'react-router-dom';

const AuthContainer = () => {
    const [loading, setLoading] = useState(false)
    return loading ? <Loading />
        :
        <div className='row  flex-center login_paner' style={{ height: '100%',minHeight:'100vh' }}>

            <div className="fw-row col-md-10 col-sm-10 row flex-center ">
                <div className="card col-10 py-4">
                    <div className="row flex-between px-3">
                        <div className="col-sm-12 col-lg-5 col-md-6 auth_form_sidebar d-none d-md-block d-lg-block"></div>
                        <div className="col-sm-12 col-lg-7 col-md-6 d-flex flex-center align-items-center ">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div>
}

export default AuthContainer