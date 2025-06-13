import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useIntl } from 'react-intl'
import axiosInstance from '../../../../app/api/axios'

export const SortModel = ({handleClose , show ,item , get_data}) => {
    const intl = useIntl()

    const [new_num, setNew_num] = useState(0)
    const [loading , setLoading ] = useState(false)
    const handleEdit_Add_submit = async(event)=>{
        setLoading(true)
        event.preventDefault()
        const formData = new FormData()
        formData.append('new_num', new_num)
        formData.append('id', item.id)
        formData.append('_method', item.method)
        try{
          await  axiosInstance.post(`${item.end_point}`,formData).then(response =>{
                get_data()    
                setLoading(false)
                handleClose(false)
            })
        }catch(e){
          console.log(e.response.data.errors);
            if(e.response.status === 422)
            {
                setLoading(false)
            }
        }
    }
    useEffect(()=>{
        setNew_num(item.number)
    },[item])
  return (
    <Modal  show={show} onHide={handleClose}  size="lg" >
    <Modal.Header closeButton>
        {item.name}
    </Modal.Header>
    <form  onSubmit={handleEdit_Add_submit}>
        <Modal.Body>
            <div className="mb-4 fv-row fv-plugins-icon-container">
                <label className="required form-label"> {intl.formatMessage({id: 'Table.Sort'})}</label>
                <input type="number"  className="form-control mb-2" value={new_num} onChange={(e)=>setNew_num(e.target.value)}  placeholder={intl.formatMessage({id: 'Table.Sort'})} />
                <div className="fv-plugins-message-container invalid-feedback" />
            </div>
        </Modal.Body>
        <Modal.Footer>
                <Button variant="secondary" onClick={(e)=>handleClose(false)}>
                        Close
                </Button>
                <button type="submit"  className="btn btn-primary">
                {!loading && <span className='indicator-label'>{intl.formatMessage({id: 'Form.Create'})} </span>}
                    {loading && (
                    <span className='indicator-progress' style={{display: 'block'}}>
                    {intl.formatMessage({id: 'Form.Pleasewait'})}{' '}
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                    </span>
                    )}
                </button>
        </Modal.Footer>
    </form>
    </Modal>
  )
}
