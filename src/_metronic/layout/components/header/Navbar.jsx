import clsx from 'clsx'
import { KTSVG, toAbsoluteUrl } from '../../../helpers'
import { HeaderNotificationsMenu, Search, ThemeModeSwitcher } from '../../../partials'
import { useLayout } from '../../core'
import HeaderUserMenu from '../../../partials/layout/header-menus/HeaderUserMenu'
import useAuthContext from '../../../../app/Auth/AuthContext'
import { FaClock } from "react-icons/fa";
import { Link } from 'react-router-dom'
const itemClass = 'ms-1 ms-lg-3'
const btnClass =
  'btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px'
const userAvatarClass = 'symbol-35px symbol-md-40px'
const btnIconClass = 'svg-icon-1'

const Navbar = () => {
  const { config } = useLayout()
  const { user } = useAuthContext()
  return (
    <div className='app-navbar flex-shrink-0'>
      <div className={clsx('app-navbar-item', itemClass)}>
        <ThemeModeSwitcher toggleBtnClass={clsx('btn-active-light-primary btn-custom')} />
      </div>
      
      <div className={clsx('app-navbar-item me-3', itemClass)}>
        <div
          data-kt-menu-trigger="{default: 'click'}"
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
          className={btnClass}
        >
          <KTSVG path='/media/icons/duotune/communication/com003.svg' className={btnIconClass} />
        </div>
        <HeaderNotificationsMenu />
      </div>
      
      <div className={clsx('app-navbar-item', itemClass)}>
        <div
          className={clsx('cursor-pointer symbol', userAvatarClass)}
          data-kt-menu-trigger="{default: 'click'}"
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
        >
          {user.img ?
            <img alt='Logo' src={process.env.REACT_APP_IMAGE_PATH + user.img} />
            :
            <img alt='Logo' src={toAbsoluteUrl('/media/avatars/300-1.jpg')} />
          }
        </div>
        <HeaderUserMenu />
      </div>

      {config.app?.header?.default?.menu?.display && (
        <div className='app-navbar-item d-lg-none ms-2 me-n3' title='Show header menu'>
          <div
            className='btn btn-icon btn-active-color-primary w-35px h-35px'
            id='kt_app_header_menu_toggle'
          >
            <KTSVG path='/media/icons/duotune/text/txt001.svg' className={btnIconClass} />
          </div>
        </div>
      )}
    </div>
  )
}

export { Navbar }
