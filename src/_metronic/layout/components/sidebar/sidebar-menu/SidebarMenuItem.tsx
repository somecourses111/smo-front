import { FC } from 'react'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router'
import { checkIsActive, KTSVG, WithChildren } from '../../../../helpers'
import { useLayout } from '../../../core'

type Props = {
  to: string
  title: string
  icon?: string
  fontIcon?: string
  hasBullet?: boolean
  count?: string
}

const SidebarMenuItem: FC<Props & WithChildren> = ({
  children,
  to,
  title,
  icon,
  fontIcon,
  count,
  hasBullet = false,
}) => {
  const { pathname } = useLocation()
  const isActive = checkIsActive(pathname, to)
  const { config } = useLayout()
  const { app } = config

  return (
    <div className='menu-item'>
      <Link className={clsx('menu-link without-sub', { active: isActive })} to={to}>
        {hasBullet && (
          <span className='menu-bullet'>
            <span className='bullet bullet-dot'></span>
          </span>
        )}
        {icon && app?.sidebar?.default?.menu?.iconType === 'svg' && (
          <span className='menu-icon'>
            <KTSVG path={icon} className='svg-icon-2' />
          </span>
        )}
        {fontIcon && app?.sidebar?.default?.menu?.iconType === 'font' && (
          <i className={clsx('bi fs-3', fontIcon)}></i>
        )}
        <span className='menu-title'>{title}</span>
        {count && count !== '0' && <span className='pending_orders_count'>{count}</span>}
      </Link>
      {children}
    </div>
  )
}

export { SidebarMenuItem }
