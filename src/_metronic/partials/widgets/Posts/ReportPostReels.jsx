import React from 'react'
import { KTSVG, toAbsoluteUrl } from '../../../helpers'
import { Dropdown1 } from '../../content/dropdown/Dropdown1'
import { Link } from 'react-router-dom'
import { Images } from '../React_Table/Images'
import { useIntl } from 'react-intl'
const ReportPostReels = ({className , row , Delete}) => {
  const intl = useIntl()
  const user = row.user;
  const reel = row.reel;
  const reporter = row.reporter;
  const reported = row.reported;
  return (
    <div className={`card ${className}`}>
    <div className='card-body pb-0'>
      <div className='d-flex flex-between align-items-center mb-5'>
        <div className='d-flex flex-start'>
              {reporter&& 
                <div className='d-flex align-items-center '>
                  <span className='text-gray-800 text-hover-primary fs-6 fw-bold me-5' >From</span>
                  <div className='symbol symbol-45px me-5'>
                    <Images img ={reporter.img} name={reporter.name} />
                  </div>
                  <div className='d-flex flex-column'>
                    <Link to='' className='text-gray-800 text-hover-primary fs-6 fw-bold'>
                      {reporter.name}
                    </Link>
                    <span className='text-gray-400 fw-semibold'>  #{reporter.id}</span>
                  </div>
                </div>
              }
              {reported&& 
                <div className='d-flex align-items-center ms-3'>
                  <span  className='text-gray-800 text-hover-primary fs-6 fw-bold mx-5' >To</span>
                  <div className='symbol symbol-45px me-5'>
                    <Images img ={reported.img} name={reported.name} />
                  </div>
                  <div className='d-flex flex-column'>
                    <Link to='' className='text-gray-800 text-hover-primary fs-6 fw-bold'>
                      {reported.name}
                    </Link>
                    <span className='text-gray-400 fw-semibold'>  #{reported.id}</span>
                  </div>
                </div>
              }
        </div>

        <div className='my-0'>
          <div className='d-flex flex-center'>
          <button onClick={(e)=>Delete(reel.id)} className='btn me-2  btn-light-danger'> {intl.formatMessage({id: 'Table.Delete'})}  </button>
            <Link to={`/Achievements/Edit-Achievements-Gift/${reel.id}`} className='btn btn-light-dark'> { intl.formatMessage({id: 'Table.Ban_User'})} </Link>
          </div>
        </div>
      </div>

      <div className='mb-5'>
        <div className="text-end">
          <span className='text-end text-gray-400 fw-semibold fs-7'>  {reel.created_at}</span>
        </div>
        {reel.url ? 
          <iframe
            title='widget11-video'
            className='embed-responsive-item rounded h-300px w-100'
            src={ process.env.REACT_APP_IMAGE_PATH+reel.url}
            allowFullScreen={true}
          />
        :
        
        <div className='bgi-no-repeat bgi-size-cover rounded min-h-250px mb-5' 
            style={{
              backgroundImage: reel.img ?`url('${toAbsoluteUrl( process.env.REACT_APP_IMAGE_PATH+reel.img)}')`  : `url('${toAbsoluteUrl('/media//photo/not_found.jpg')}')`,
              backgroundColor: reel.img ? 'inherit' : '#e6e6e6',
              backgroundPosition: 'center center',
              backgroundSize: 'contain'
            }}>
        </div>
        }
        {/* begin::Text */}
        <div className='text-gray-800 mb-5'>
          {reel.description}
        </div>
        {/* end::Text */}

        {/* begin::Toolbar */}
        <div className='d-flex align-items-center mb-5'>
          <Link to=''  className='btn btn-sm btn-light btn-color-muted btn-active-light-success px-4 py-2 me-4'>
            <KTSVG path='/media/icons/duotune/communication/com012.svg' className='svg-icon-3' />
            {reel.comments}
          </Link>

          <Link to='' className='btn btn-sm btn-light btn-color-muted btn-active-light-danger px-4 py-2' >
            <KTSVG path='/media/icons/duotune/general/gen030.svg' className='svg-icon-2' />
            {reel.likes}
          </Link>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ReportPostReels