import React from 'react'
import { FaUserCircle } from 'react-icons/fa';

export const Images = ({img ,  name}) => {
    function randomNumberInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

  return  img ? 
    <div className='symbol symbol-50px me-3 '>
            <img src={process.env.REACT_APP_IMAGE_PATH + img} className='' alt='' />
    </div>
  :
  name ?
  <div className={`symbol-label charachter_number fs-3 bg-light-${randomNumberInRange(0, 6)} text-${randomNumberInRange(0, 6)}`}>{name[0]}</div>
  :
  <FaUserCircle className='me-2' size={50} />
}
