import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useIntl } from 'react-intl'
import axiosInstance from '../../../../app/api/axios'
import UserAutocomplete from '../AutoComplete/UserAutocomplete'
import Swal from 'sweetalert2'

export const SendModel = ({handleClose , show ,item , get_data}) => {
    const intl = useIntl()
    const [user_value, setUSER_Value] = useState(null);
    const [Days, setDays] = useState(null)
    const [loading , setLoading ] = useState(false)
    const [errors , setErrors] = useState([]);

    const handleEdit_Add_submit = async(event)=>{
        setLoading(true)
        event.preventDefault()
        const formData = new FormData()
        formData.append('id', item.id)
        formData.append('days', Days);
        formData.append('user_id', user_value.id);
        try{
          await  axiosInstance.post(`${item.end_point}`,formData).then(response =>{
                setLoading(false)
                Swal.fire({
                    title: "Success",
                    icon: "success",
                    confirmButtonText: "OK",
                });
                handleClose(false)
                setErrors([])
                setDays(null)
                setUSER_Value(null)
            })
        }catch(e){
          console.log(e.response.data.errors);
            if(e.response.status === 422)
            {
                setLoading(false)
                setErrors(e.response.data.errors)
            }
            else if(e.response.status === 423)
            {
                console.log(e.response.data.message);
                setLoading(false)
                Swal.fire({
                    title: "Error",
                    icon: "error",
                    text: e.response.data.message,
                });
            }
        }
    }
    useEffect(()=>{
        setDays(null)
        setUSER_Value(null)
        setErrors([])
    },[])

  return (
    <Modal  show={show} onHide={handleClose}  size="lg" >
    <Modal.Header closeButton>
        Send Model
    </Modal.Header>
    <form  onSubmit={handleEdit_Add_submit}>
        <Modal.Body>
        <div className="mb-3 fv-row fv-plugins-icon-container">
            <label className="required form-label"> {intl.formatMessage({id: 'Form.User_id'})}  </label>
            <UserAutocomplete value={user_value} setValue={setUSER_Value}  />
            <div className="fv-plugins-message-container invalid-feedback" />
            {errors.user_id &&
                <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                    <span role='alert'>{errors.user_id}</span>
                    </div>
                </div>
            }
        </div>
        <div className="mb-3 fv-row fv-plugins-icon-container">
            <label className="required form-label"> {intl.formatMessage({id: 'Form.ExpireDateByDaysnumber'})}</label>
            <input type="number" name="days" className="form-control mb-2" value={Days} onChange={(e)=>setDays(e.target.value)} placeholder={intl.formatMessage({id: 'Form.ExpireDateByDaysnumber'})}  />
            <div className="fv-plugins-message-container invalid-feedback" />
            {errors.days &&
                <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                    <span role='alert'>{errors.days}</span>
                    </div>
                </div>
            }
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
