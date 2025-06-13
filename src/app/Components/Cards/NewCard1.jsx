import React from 'react'
import { toAbsoluteUrl } from '../../../_metronic/helpers'

const NewCard1 = ({className, title, description, avatar , id ,img}) => {
  return (
    <div className={`card ${className}`}>
    <div className='card-body d-flex align-items-center pt-0 pb-0'>
      <div className='d-flex flex-column flex-grow-1 py-2 py-lg-10 me-2'>
        <span  className='fw-bold text-dark fs-4 mb-2 text-hover-primary'>
          {title}
        </span>
        <span
          className='fw-semibold  fs-5 mb-1'
          dangerouslySetInnerHTML={{__html: description}}
        ></span>
        <span
          className='fw-semibold text-muted fs-6'
          dangerouslySetInnerHTML={{__html: '# '+id}}
        ></span>
      </div>

      <img src={process.env.REACT_APP_IMAGE_PATH + img} alt='' className='align-self-center h-100px' />
    </div>
  </div>
  )
}

export default NewCard1