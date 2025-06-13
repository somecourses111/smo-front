import React from 'react'
import { KTSVG, toAbsoluteUrl } from '../../../helpers'
import { Dropdown1 } from '../../content/dropdown/Dropdown1'
import { Link } from 'react-router-dom'
import { Images } from '../React_Table/Images'
import { useIntl } from 'react-intl'
const PostReels = ({className , row , Delete}) => {
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
            <Link to={`/Achievements/Edit-Achievements-Gift/${row.id}`} className='btn btn-light-dark'> { intl.formatMessage({id: 'Table.Ban_User'})} </Link>
          </div>
        </div>
      </div>

      <div className='mb-5'>
        <div className="text-end">
          <span className='text-end text-gray-400 fw-semibold fs-7'>  {row.created_at}</span>
        </div>
        {row.url ? 
          <iframe
            title='widget11-video'
            className='embed-responsive-item rounded h-300px w-100'
            src={ process.env.REACT_APP_IMAGE_PATH+row.url}
            allowFullScreen={true}
          />
        :
        
        <div className='bgi-no-repeat bgi-size-cover rounded min-h-250px mb-5' 
            style={{
              backgroundImage: row.img ?`url('${toAbsoluteUrl( process.env.REACT_APP_IMAGE_PATH+row.img)}')`  : `url('${toAbsoluteUrl('/media//photo/not_found.jpg')}')`,
              backgroundColor: row.img ? 'inherit' : '#e6e6e6',
              backgroundPosition: 'center center',
              backgroundSize: 'contain'
            }}>
        </div>
        }
        {/* begin::Text */}
        <div className='text-gray-800 mb-5'>
          {row.description}
        </div>
        {/* end::Text */}

        {/* begin::Toolbar */}
        <div className='d-flex align-items-center mb-5'>
          <Link to={`/Posts/Comments/${row.id}/reels`}  className='btn btn-sm btn-light btn-color-muted btn-active-light-success px-4 py-2 me-4'>
            <KTSVG path='/media/icons/duotune/communication/com012.svg' className='svg-icon-3' />
            {row.comments}
          </Link>

          <Link to={`/Posts/Likes/${row.id}/reels`} className='btn btn-sm btn-light btn-color-muted btn-active-light-danger px-4 py-2' >
            <KTSVG path='/media/icons/duotune/general/gen030.svg' className='svg-icon-2' />
            {row.likes}
          </Link>
        </div>
      </div>
    </div>
  </div>
  )
}

export default PostReels