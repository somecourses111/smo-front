import React from 'react'

export const MedalsCard = ({item}) => {
    const path = process.env.REACT_APP_IMAGE_PATH+item.custom_image;

    return (
        <div className='col-12 col-sm-12 col-xl'>
            <div className='card h-100'>
                <div className='card-body d-flex justify-content-center text-center flex-column p-8'>
                    <div className='text-gray-800 text-hover-primary d-flex flex-column'>
                        <div className='symbol symbol-200px '>
                            <img src={path} alt='' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )
}
