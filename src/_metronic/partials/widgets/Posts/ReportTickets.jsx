import React from 'react'
import { KTSVG, toAbsoluteUrl } from '../../../helpers'
import { Dropdown1 } from '../../content/dropdown/Dropdown1'
import { Link } from 'react-router-dom'
import { Images } from '../React_Table/Images'
import { useIntl } from 'react-intl'

const ReportTickets = ({className , row , Delete}) => {
  const intl = useIntl()
  const user = row.user;
  return (
    <div className={`card ${className}`}>
    <div className='card-body pb-0'>
      <div className='d-flex align-items-center mb-5'>
        {user&& 
          <div className='d-flex align-items-center flex-grow-1'>
            <div className='symbol symbol-45px me-5'>
              <Images img ={user.img} name={user.name} />
            </div>
            <div className='d-flex flex-column'>
              <Link to='' className='text-gray-800 text-hover-primary fs-6 fw-bold'>
                {user.name}
              </Link>
              <span className='text-gray-400 fw-semibold'>  #{user.id}</span>
            </div>
          </div>
        }

        <div className='my-0'>
          <div className='d-flex flex-center'>
          <button onClick={(e)=>Delete(row.id)} className='btn me-2  btn-light-danger'> {intl.formatMessage({id: 'Table.Delete'})}  </button>
          <div className='form-check form-switch form-switch-sm form-check-custom form-check-solid flex-center'>
                    <input
                        className='form-check-input'
                        type='checkbox'
                        disabled
                        value={row.status}
                        name='notifications'
                        defaultChecked={row.status}
                      />
                </div>
            </div>
        </div>
      </div>

      <div className='mb-5'>
        <div className="text-end">
          <span className='text-end text-gray-400 fw-semibold fs-7'>  {row.created_at}</span>
        </div>
        <div className='bgi-no-repeat bgi-size-cover rounded min-h-250px mb-5' 
            style={{
              backgroundImage: row.img ?`url('${toAbsoluteUrl( process.env.REACT_APP_IMAGE_PATH+row.img)}')`  : `url('${toAbsoluteUrl('/media//photo/not_found.jpg')}')`,
              backgroundColor: row.img ? 'inherit' : '#e6e6e6',
              backgroundPosition: 'center center',
              backgroundSize: 'contain'
            }}>
        </div>
        <div className='text-gray-800 '>
          {row.problem}
        </div>
        <div className='text-gray-800 mb-5'>
          {row.description}
        </div>
      </div>
    </div>
  </div>
  )
}

export default ReportTickets