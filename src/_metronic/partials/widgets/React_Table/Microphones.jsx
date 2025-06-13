import React from 'react'

export const Microphones = ({items , id}) => {
    function randomNumberInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  return (
    <div className='symbol-group symbol-hover flex-nowrap'>
        { items.map((item, index) => (
        <div  className='symbol symbol-20px symbol-circle'  data-bs-toggle='tooltip'  title={`name : ${item.name} , id : ${item.id} , key : ${item.key}` } key={`cw7-item-${index}`} >
            {item.img ? 
            <img alt='Pic' src={process.env.REACT_APP_IMAGE_PATH + item.img} />
            :
             <div className='symbol-label fs-8 fw-bold bg-dark text-gray-300'>{item.name[0]}</div>
            }
        </div>
        ))}
    </div>
  )
}
