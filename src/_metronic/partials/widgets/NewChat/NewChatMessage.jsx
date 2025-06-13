import React from 'react'
import { Images } from '../React_Table/Images'
import { useIntl } from 'react-intl'

export const NewChatMessage = ({item, key ,Delete , endpoint}) => {
  const intl = useIntl()

  return (
    <div className="d-flex d-flex flex-between mb-10 mb-10  align-items-start" key={key}>
        <div className="d-flex flex-column align-items align-items-start">
            <div className="d-flex align-items-center mb-2">
                {item.user &&
                <>
                <div className="symbol  symbol-35px symbol-circle ">
                    <Images img ={item.user.img} name={item.user.name} />
                </div>
                <div className="ms-3">
                    <div  className="fs-5 fw-bolder text-gray-900 text-hover-primary me-1">{item.user.name}</div>
                    <span className="text-muted fs-7 mb-1"> #{item.user.id}</span>
                </div>
                </> 
                }
            </div>
            <div className="p-5 rounded bg-light-info text-dark fw-bold mw-lg-400px text-start" data-kt-element="message-text">
                {item.text}
            </div>
        </div>
        {endpoint && 
            <button className='btn me-2  btn-light-danger'onClick={(e)=>Delete(item.id)} > {intl.formatMessage({id: 'Table.Delete'})}</button>
        }
    </div>
  )
}
