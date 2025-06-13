import React from 'react'
import { Link } from 'react-router-dom'
import { KTSVG } from '../../../helpers'

export const CustomeListsWidget1 = ({ data, title }) => {
  return (
    <div className='card card-xl-stretch mb-xl-8' >

      <div className='card-header border-0 pt-5  text-end flex-end' style={{justifyContent:'end'}}>
        <h3 className='card-title align-items-end  text-end flex-column'>
          <span className='card-label fw-bold text-dark'>{title}</span>
        </h3>
      </div>

      <div className='card-body pt-5'>
        {data.map((item, index) => (
          <div dir='ltr' key={index} className='d-flex align-items-center mb-8 text-end'>
            {/* begin::Bullet */}
            <div className='flex-grow-1'>
              <Link to={item.link} className='text-dark text-hover-primary fs-6 fw-bold'>
                {item.title}
              </Link>
            </div>
            <div className='form-check form-check-custom form-check-solid mx-3'>
            <span className='bullet bullet-vertical h-40px bg-warning'></span>
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}
