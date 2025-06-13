import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useIntl } from 'react-intl'
import axiosInstance from '../../../../app/api/axios'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import WaresAutocomplete from '../AutoComplete/WaresAutocomplete';
import VipAutocomplete from '../AutoComplete/VipAutocomplete';
import { MdCloudUpload } from 'react-icons/md';


export const EditEventReword = ({ handleClose, endPoint, show, get_data, id }) => {
    const intl = useIntl()
    const [user_value, setUSER_Value] = useState(null); 
    const form_type = [
        { id: 'ware', name: 'Wares' },
        { id: 'vip', name: 'Vips' },
        { id: 'achievement', name: 'Achievements' },
        { id: 'coins', name: 'Coins' },
    ]
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([]);
    const [fileName, setFileName] = useState("No selected file")
    const [data, setData] = useState({
        event_type : null,
        event_id : null,
        type    : null,
        target  : null,
        img     : null,
        expire  : null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));

    };

    const changeHandler_iamge = (event) => {
        const name = event.target.name;
        setData((prevData) => ({ ...prevData, [name]: event.target.files[0] }));
        setFileName(event.target.files[0].name)
    };
    
    const handleEdit_Add_submit = async (event) => {
        setLoading(true)
        event.preventDefault()
        const formData = new FormData()
        formData.append('enctype', 'multipart/form-data');
        formData.append('_method', 'PATCH');
        Object.entries(data).forEach(([key, value]) => {
            if (key === 'img') {
                formData.append(key, value);
            } else {
                formData.append(key, value);
            }
        });
        try {
            await axiosInstance.post(`${endPoint}/${id}`, formData).then(response => {
                setLoading(false)
                get_data()
                handleClose(false)
            })
        } catch (e) {
            if (e.response.status === 422) {
                setLoading(false)
                setErrors(e.response.data.errors)
            }
        }
    }

    const get_item = async()=>{
        await axiosInstance.get(`${endPoint}/${id}`).then(function(res){
            const response =  res.data.data;
           
            setData({
                event_type : response.event_type,
                event_id   : response.event_id,
                type       :  response.type,
                level      :  response.level,
                img        : null,
                expire     :  response.expire,
                img_name   : response.target,
                target   : response.target,
            });
            if(response.type === 'ware')
            {
                setUSER_Value(response.ware );
            } 
            else if(response.type === 'vip')
            {
                setUSER_Value(response.vip );
            } 
          
          })
    }

    useEffect(() => {
        // setData((prevData) => ({ ...prevData, target: '' }));
        // setUSER_Value(null)
    }, [data.type])

    useEffect(() => {
        if (user_value) {
            setData((prevData) => ({ ...prevData, target: user_value.id }));
        }
    }, [user_value])

    useEffect(() => {
        if (show) {
            get_item()
        }
    }, [show])
    console.log(data);
    console.log(user_value);
    return (
        <Modal show={show} onHide={handleClose} size="lg" >
            <Modal.Header closeButton>
                {intl.formatMessage({ id: 'Table.EventRewords' })}
            </Modal.Header>
            <form onSubmit={handleEdit_Add_submit}>
                <Modal.Body>
                    <div className="row">
                        <div className="col-12 mb-4">
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">{intl.formatMessage({ id: 'Form.Type' })} </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label={intl.formatMessage({ id: 'Form.Type' })}
                                    name="type"
                                    onChange={handleChange}
                                    value={data.type}
                                >
                                    {form_type.map((row, key) => (
                                        <MenuItem key={key} value={row.id}>
                                            {row.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {errors.type_id &&
                                <div className='fv-plugins-message-container'>
                                    <div className='fv-help-block'>
                                        <span role='alert'>{errors.type_id}</span>
                                    </div>
                                </div>
                            }
                        </div>

                        {data.type === 'ware' &&
                            <div className="mb-3 fv-row fv-plugins-icon-container">
                                <label className="required form-label"> {intl.formatMessage({ id: 'Form.Wares' })}  </label>
                                <WaresAutocomplete value={user_value} setValue={setUSER_Value} />
                                <div className="fv-plugins-message-container invalid-feedback" />
                                {errors.target &&
                                    <div className='fv-plugins-message-container'>
                                        <div className='fv-help-block'>
                                            <span role='alert'>{errors.target}</span>
                                        </div>
                                    </div>
                                }
                            </div>
                        }

                        {data.type === 'vip' &&
                            <div className="mb-3 fv-row fv-plugins-icon-container">
                                <label className="required form-label"> {intl.formatMessage({ id: 'Form.Vips' })}  </label>
                                <VipAutocomplete value={user_value} setValue={setUSER_Value} />
                                <div className="fv-plugins-message-container invalid-feedback" />
                                {errors.target &&
                                    <div className='fv-plugins-message-container'>
                                        <div className='fv-help-block'>
                                            <span role='alert'>{errors.target}</span>
                                        </div>
                                    </div>
                                }
                            </div>
                        }
                        {data.type === 'achievement' &&
                            <div className="mb-3 fv-row fv-plugins-icon-container d-flex flex-center">
                                <div className="image-input image-input-empty image-input-outline image-input-placeholder mb-3" data-kt-image-input="true">
                                    <div className="file" >
                                        <form onClick={() => document.querySelector(".input-field").click()} >
                                            <input type="file" accept='image/*' className='input-field' name='img' hidden
                                                onChange={changeHandler_iamge}
                                            />

                                        {data.img === null && data.img_name  ?
                                            <img src={process.env.REACT_APP_IMAGE_PATH+data.img_name} width={150} height={150} alt={fileName} />
                                            :
                                            data.img ?
                                                <img src={URL.createObjectURL(data.img)} width={150} height={150} alt={fileName} />
                                            : 
                                                <>
                                                    <MdCloudUpload color='#1475cf' size={60} />
                                                    <p> {intl.formatMessage({ id: 'Form.BrowseFilestoupload' })} </p>
                                                </>
                                            }

                                        </form>
                                    </div>
                                </div>
                                {errors.img &&
                                    <div className='fv-plugins-message-container'>
                                        <div className='fv-help-block'>
                                            <span role='alert'>{errors.img}</span>
                                        </div>
                                    </div>
                                }
                            </div>
                        }

                        {data.type === 'coins' &&
                            <div className="mb-4 fv-row fv-plugins-icon-container">
                                <label className="required form-label"> {intl.formatMessage({ id: 'Form.Coins' })}</label>
                                <input type="number" name="target" className="form-control mb-2" value={data.target} onChange={handleChange} placeholder={intl.formatMessage({ id: 'Form.Coins' })} />
                                <div className="fv-plugins-message-container invalid-feedback" />
                                {errors.target &&
                                    <div className='fv-plugins-message-container'>
                                        <div className='fv-help-block'>
                                            <span role='alert'>{errors.target}</span>
                                        </div>
                                    </div>
                                }
                            </div>
                        }
                        <div className="mb-4 fv-row fv-plugins-icon-container">
                            <label className="required form-label"> {intl.formatMessage({ id: 'Form.ExpireDateByDaysnumber' })}</label>
                            <input type="number" name="expire" className="form-control mb-2" value={data.expire} onChange={handleChange} placeholder={intl.formatMessage({ id: 'Form.ExpireDateByDaysnumber' })} />
                            <div className="fv-plugins-message-container invalid-feedback" />
                            {errors.expire &&
                                <div className='fv-plugins-message-container'>
                                    <div className='fv-help-block'>
                                        <span role='alert'>{errors.expire}</span>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={(e) => handleClose(false)}>
                        Close
                    </Button>
                    <button type="submit" className="btn btn-primary">
                        {!loading && <span className='indicator-label'>{intl.formatMessage({ id: 'Form.Create' })} </span>}
                        {loading && (
                            <span className='indicator-progress' style={{ display: 'block' }}>
                                {intl.formatMessage({ id: 'Form.Pleasewait' })}{' '}
                                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                            </span>
                        )}
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}
