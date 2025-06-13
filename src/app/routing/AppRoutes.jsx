import React, { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { ErrorsPage } from '../modules/errors/ErrorsPage'
import { App } from '../App'

import GuestLayout from '../Layout/GuestLayout'
import AuthLayouy from '../Layout/AuthLayouy'
import { MasterLayout } from '../../_metronic/layout/MasterLayout'
import { AnimatePresence } from 'framer-motion'
import { useLang } from '../../_metronic/i18n/Metronici18n'

import CountriesHome from '../pages/dashboard/Countries/CountriesHome'
import { AddCountries } from '../pages/dashboard/Countries/AddCountries'
import { UpdateCountries } from '../pages/dashboard/Countries/UpdateCountries'
import Profile from '../pages/Auth/Profile'
import AuthContainer from '../pages/Auth/AuthContainer'
import DashboardWrapper from '../pages/dashboard/DashboardWrapper'
import Signin from '../pages/Auth/Auth_Pages/Signin'
import HostAgencyHome from '../pages/dashboard/HostAgency/HostAgencyHome'
import { AddHostAgency } from '../pages/dashboard/HostAgency/AddHostAgency'
import { EditHostAgency } from '../pages/dashboard/HostAgency/EditHostAgency'


const AppRoutes = () => {
  const location = useLocation()

  const lang = useLang()
  useEffect(() => {
    if (lang === 'ar') {
      require('../../_metronic/assets/style/style_rtl.css')
    } else {
      require('../../_metronic/assets/style/style.css')
    }
  }, [location])

  function changeFavicon(newIconUrl) {
    var oldIcon = document.querySelector('link[rel="icon"]')
    if (oldIcon) {
      oldIcon.parentNode.removeChild(oldIcon)
    }

    var newIcon = document.createElement('link')
    newIcon.rel = 'icon'
    newIcon.href = newIconUrl

    document.head.appendChild(newIcon)
  }

  const img = process.env.REACT_APP_IMAGE_PATH + localStorage.getItem('web_img')
  useEffect(() => {
    changeFavicon(img)
    document.title = localStorage.getItem('web_name')
    document.description = localStorage.getItem('web_name')
  }, [])

  return (
    <AnimatePresence mode='wait' initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route element={<App />}>
          <Route path='*' element={<Navigate to='/dashboard' />} />
          <Route path='error/*' element={<ErrorsPage />} />

          <Route element={<GuestLayout />}>
            <Route element={<AuthContainer />}>
              {/* Auth */}
              <Route path='/login' element={<Signin />} />
            </Route>
          </Route>

          <Route element={<AuthLayouy />}>
            <Route element={<MasterLayout />}>
              <Route path='dashboard' element={<DashboardWrapper/>} />
              <Route path='profile' element={<Profile />} />

              {/* Countries */}
              <Route path='Countries' element={<CountriesHome />} />
              <Route path='Add-Countries' element={<AddCountries />} />
              <Route path='Edit-Countries/:id' element={<UpdateCountries />} />


              {/* HostAgency */}
              <Route path='Agency/HostAgency' element={<HostAgencyHome />} />
              <Route path='Agency/Add-HostAgency' element={<AddHostAgency />} />
              <Route path='Agency/Edit-HostAgency/:id' element={<EditHostAgency />} />

            </Route>
          </Route>
        </Route>
      </Routes>
    </AnimatePresence>
    //admin-countries
  )
}

export default AppRoutes
