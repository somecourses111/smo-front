import React from 'react'

export const ITemCard = ({item}) => {
    const path = process.env.REACT_APP_IMAGE_PATH+item.show_img;

    return (
        <div className='col-12 col-sm-12 col-xl'>
            <div className='card h-100'>
                <div className='card-body d-flex justify-content-center text-center flex-column p-8'>
                    <div className='text-gray-800 text-hover-primary d-flex flex-column'>
                    <div className='symbol symbol-75px mb-6'>
                        <img src={path} alt='' />
                    </div>
                    <div className='fs-5 fw-bolder mb-2'>{item.name}</div>
                    </div>
                    <div className='fs-7 fw-bold text-gray-400 mt-auto'>{item.title}</div>
                </div>
            </div>
        </div>
      )
}
