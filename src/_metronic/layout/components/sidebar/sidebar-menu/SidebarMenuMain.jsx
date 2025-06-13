import React from 'react'
import { useIntl } from 'react-intl'
import { KTSVG } from '../../../../helpers'
import { SidebarMenuItemWithSub } from './SidebarMenuItemWithSub'
import { SidebarMenuItem } from './SidebarMenuItem'
import useAuthContext from '../../../../../app/Auth/AuthContext'

import { Navigate, useNavigate } from 'react-router-dom'

const SidebarMenuMain = () => {
  const intl = useIntl()
  const { pending_order } = useAuthContext()
  const { check_role } = useAuthContext()

  return (
    <div className=''>



      {/* {check_role('browse-countries') && ( */}
      <SidebarMenuItem
        title={intl.formatMessage({ id: 'Menu.Agency' })}
        to='/Agency'
        icon='/media/icons/duotune/maps/map008.svg'
        fontIcon='bi-layers'
      />
      {/* )} */}

      <SidebarMenuItemWithSub
        to='/Agency'
        title={intl.formatMessage({ id: 'Menu.Agency' })}
        icon='/media/icons/duotune/general/gen003.svg'
        hasBullet={false}
      >

        <SidebarMenuItem
          to='/Agency/HostAgency'
          title={intl.formatMessage({ id: 'Menu.HostAgency' })}
          hasBullet={true}
        />

      </SidebarMenuItemWithSub>


    </div>
  )
}

export { SidebarMenuMain }
