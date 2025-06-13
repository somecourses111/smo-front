import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useIntl } from 'react-intl'
import axiosInstance from '../../../../app/api/axios'

export const EventRoles = ({handleClose , endPoint ,show  , get_data , id}) => {
    const intl = useIntl()
    const [loading , setLoading ] = useState(false)
    const [errors , setErrors] = useState([]);
    const [ItemExist ,setItemExist ] = useState(false)
    const [data , setData] = useState({
        desc_en     : '',
        desc_ar     : '',
        url     : '',
    }); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log([name , value]);
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleEdit_Add_submit = async(event)=>{
        setLoading(true)
        event.preventDefault()
        const formData = new FormData()
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        });
        formData.append('item_exists', Number(ItemExist));
        formData.append('_method', 'PATCH')
        try{
          await  axiosInstance.post(`${endPoint}/${id}`,formData).then(response =>{
                setLoading(false)
                get_data()
                handleClose(false)
            })
        }catch(e){
            if(e.response.status === 422)
            {
                setLoading(false)
                setErrors(e.response.data.errors)
            }
        }
    }

    const get_item = async()=>{
        try {
            await axiosInstance.get(`${endPoint}/${id}`).then(function(response){
                const data = response.data;
                setData({
                    desc_en   : data.desc_en   ,
                    desc_ar   : data.desc_ar   ,
                    url       : data.url   ,
                  });
                setItemExist(true)
            });
        } catch (error) {
            setData({
                desc_en   : ''   ,
                desc_ar   : ''   ,
                url       : ''   ,
              });
              setItemExist(0)

        }
      
    }
    
  useEffect(()=>{
    if(show)
    {
        get_item()
    }
  },[show])
  return (
    <Modal  show={show} onHide={handleClose}  size="lg" >
    <Modal.Header closeButton>
        {intl.formatMessage({id: 'Table.EventRoles'})}
    </Modal.Header>
    <form  onSubmit={handleEdit_Add_submit}>
        <Modal.Body>
        <div className="row">
            <div className="mb-3 fv-row fv-plugins-icon-container">
                <label className="required form-label"> {intl.formatMessage({id: 'Form.URL'})}  </label>
                <input type="text" name="url" className="form-control mb-2" value={data.url} onChange={handleChange} placeholder={intl.formatMessage({id: 'Form.URL'})}  />
                <div className="fv-plugins-message-container invalid-feedback" />
                {errors.url &&
                    <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                        <span role='alert'>{errors.url}</span>
                        </div>
                    </div>
                }
            </div>
            <div className="mb-3 fv-row fv-plugins-icon-container mt-3 col-lg-6 col-sm-12">
                <label className="form-label">{intl.formatMessage({id: 'Form.DiscretionEN'})}</label>
                <textarea name="desc_en" className='form-control mb-2'  
                    maxLength="250"
                    onChange={handleChange}
                    cols="30" rows="5" value={data.desc_en} >
                </textarea>
                {errors.desc_en &&
                    <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                        <span role='alert'>{errors.desc_en}</span>
                        </div>
                    </div>
                }
            </div>
            <div className="mb-3 fv-row fv-plugins-icon-container mt-3 col-lg-6 col-sm-12">
                <label className="form-label">{intl.formatMessage({id: 'Form.DiscretionAR'})}</label>
                <textarea name="desc_ar" className='form-control mb-2'  
                    maxLength="250"
                    onChange={handleChange}
                    cols="30" rows="5" value={data.desc_ar}>
                </textarea>
                {errors.desc_ar &&
                    <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                        <span role='alert'>{errors.desc_ar}</span>
                        </div>
                    </div>
                }
            </div>
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
