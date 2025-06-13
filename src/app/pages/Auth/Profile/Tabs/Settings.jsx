import React, {useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import {useNavigate, useParams} from 'react-router-dom'
import axiosInstance from '../../../../api/axios'
import Swal from 'sweetalert2'
import {FormControl, InputLabel, MenuItem, Select} from '@mui/material'
import {MdCloudUpload} from 'react-icons/md'
import useAuthContext from '../../../../Auth/AuthContext'

export const Settings = ({user, get_data}) => {
  const intl = useIntl()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState([])
  const [fileName, setFileName] = useState('No selected file')
  const navigate = useNavigate()
  const {id} = useParams()
  const {check_role} = useAuthContext()

  const types = [
    {id: 'user', name: intl.formatMessage({id: 'Table.User'})},
    {id: 'merchant', name: intl.formatMessage({id: 'Table.Merchants'})},
    {id: 'admin', name: intl.formatMessage({id: 'Table.Admins'})},
  ]

  const [data, setData] = useState({
    type: 'user',
    img: null,
    name: null,
    // email: null,
    // phone: null,
    // password: null,
    // national_id: null,
    // confirm_password: null,
  })

  const handleChange = (e) => {
    const {name, value} = e.target
    setData((prevData) => ({...prevData, [name]: value}))
  }

  const changeHandler_iamge = (event) => {
    const name = event.target.name
    setData((prevData) => ({...prevData, [name]: event.target.files[0]}))
    setFileName(event.target.files[0].name)
  }

  const handleEdit_Add_submit = async (event) => {
    setLoading(true)
    event.preventDefault()
    const formData = new FormData()
    formData.append('enctype', 'multipart/form-data')
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value)
    })
    formData.append('_method', 'PATCH')

    try {
      await axiosInstance.post(`/admin-users/${id}`, formData).then((response) => {
        Swal.fire({
          title: 'Success',
          icon: 'success',
          confirmButtonText: 'OK',
        })
        get_data()
        setLoading(false)
        setErrors([])
      })
    } catch (e) {
      if (e.response.status === 422) {
        setLoading(false)
        setErrors(e.response.data.errors)
      }
    }
  }

  useEffect(() => {
    if (!check_role('show-users') || !check_role('edit-users')) {
      navigate('/')
    }

    if (user) {
      setData({
        img_name: user.img,
        img: null,
        type: user.type,
        name: user.name,
        // phone: user.phone,
        // email: user.email,
        // national_id: user.national_id,
        // password: null,
        // confirm_password: null,
      })
    }
  }, [user])

  return (
    <div className=''>
      <form
        onSubmit={handleEdit_Add_submit}
        id='kt_ecommerce_add_category_form'
        className='form d-flex flex-column flex-lg-row fv-plugins-bootstrap5 fv-plugins-framework'
        data-kt-redirect='../../demo1/dist/apps/ecommerce/catalog/categories.html'
      >
        <div className='d-flex flex-column gap-7 gap-lg-10 w-100 w-lg-300px mb-7 me-lg-10'>
          <div className='card card-flush py-4'>
            <div className='card-header'>
              <div className='card-title'>
                <h2>{intl.formatMessage({id: 'Form.ImageContent'})} </h2>
              </div>
            </div>

            <div className='card-body text-center pt-0'>
              <div
                className='image-input image-input-empty image-input-outline image-input-placeholder mb-3'
                data-kt-image-input='true'
              >
                <div className='file'>
                  <form onClick={() => document.querySelector('.input-field2').click()}>
                    <input
                      type='file'
                      accept='image/*'
                      className='input-field2'
                      name='img'
                      hidden
                      onChange={changeHandler_iamge}
                    />
                    {data.img === null && data.img_name ? (
                      <img
                        src={process.env.REACT_APP_IMAGE_PATH + data.img_name}
                        width={150}
                        height={150}
                        alt={fileName}
                      />
                    ) : data.img ? (
                      <img
                        src={URL.createObjectURL(data.img)}
                        width={150}
                        height={150}
                        alt={fileName}
                      />
                    ) : (
                      <>
                        <MdCloudUpload color='#1475cf' size={60} />
                        <p> {intl.formatMessage({id: 'Form.BrowseFilestoupload'})} </p>
                      </>
                    )}
                  </form>
                  {errors.img && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>
                        <span role='alert'>{errors.img}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='d-flex flex-column flex-row-fluid gap-7 gap-lg-10'>
          <div className='card card-flush py-4'>
            <div className='card-header'>
              <div className='card-title'>
                <h2>{intl.formatMessage({id: 'Form.General'})} </h2>
              </div>
            </div>

            <div className='card-body pt-0'>
              <div className='row flex-between mb-3'>
                {/* name */}
                <div className=' col-6 mb-3'>
                  <div className='mb-3 fv-row fv-plugins-icon-container'>
                    <label className='required form-label'>
                      {' '}
                      {intl.formatMessage({id: 'Form.Name'})}
                    </label>
                    <input
                      type='text'
                      name='name'
                      className='form-control mb-2'
                      value={data.name}
                      onChange={handleChange}
                      placeholder={intl.formatMessage({id: 'Form.Name'})}
                    />
                    <div className='fv-plugins-message-container invalid-feedback' />
                    {errors.name && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert'>{errors.name}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* email */}
                {/* <div className=" col-6 mb-3">
                    <div className="mb-3 fv-row fv-plugins-icon-container">
                      <label className="required form-label"> {intl.formatMessage({ id: 'Form.Email' })} </label>
                      <input disabled type="email" name="email" className="form-control mb-2" value={data.email} onChange={handleChange} placeholder={intl.formatMessage({ id: 'Form.Email' })} />
                      <div className="fv-plugins-message-container invalid-feedback" />
                      {errors.email &&
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>
                            <span role='alert'>{errors.email}</span>
                          </div>
                        </div>
                      }
                    </div>
                  </div> */}
                {/* phone */}
                {/* <div className=" col-6 mb-3">
                    <div className="mb-3 fv-row fv-plugins-icon-container">
                      <label className="required form-label"> {intl.formatMessage({ id: 'Form.Phone' })}</label>
                      <input type="number" name="phone" className="form-control mb-2" value={data.phone} onChange={handleChange} placeholder={intl.formatMessage({ id: 'Form.Phone' })} />
                      <div className="fv-plugins-message-container invalid-feedback" />
                      {errors.phone &&
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>
                            <span role='alert'>{errors.phone}</span>
                          </div>
                        </div>
                      }
                    </div>
                  </div> */}
                {/* national id */}
                {/* <div className=" col-6 mb-3">
                    <div className="mb-3 fv-row fv-plugins-icon-container">
                      <label className="required form-label"> {intl.formatMessage({ id: 'Form.National_Id' })}</label>
                      <input type="number" name="national_id" className="form-control mb-2" value={data.national_id} onChange={handleChange} placeholder={intl.formatMessage({ id: 'Form.National_Id' })} />
                      <div className="fv-plugins-message-container invalid-feedback" />
                      {errors.national_id &&
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>
                            <span role='alert'>{errors.national_id}</span>
                          </div>
                        </div>
                      }
                    </div>
                  </div> */}

                {/* Password */}
                {/* <div className=" col-6 mb-3">
                    <div className="mb-3 fv-row fv-plugins-icon-container">
                      <label className="required form-label"> {intl.formatMessage({ id: 'Form.Password' })} </label>
                      <input type="password" name="password" className="form-control mb-2" value={data.password} onChange={handleChange} placeholder={intl.formatMessage({ id: 'Form.Password' })} />
                      <div className="fv-plugins-message-container invalid-feedback" />
                      {errors.password &&
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>
                            <span role='alert'>{errors.password}</span>
                          </div>
                        </div>
                      }
                    </div>
                  </div> */}
                {/* Confirm Password */}
                {/* <div className=" col-6 mb-3">
                    <div className="mb-3 fv-row fv-plugins-icon-container">
                      <label className="required form-label">{intl.formatMessage({ id: 'Form.ConfirmPassword' })} </label>
                      <input type="password" name="confirm_password" className="form-control mb-2" value={data.confirm_password} onChange={handleChange} placeholder={intl.formatMessage({ id: 'Form.ConfirmPassword' })} />
                      <div className="fv-plugins-message-container invalid-feedback" />
                      {errors.confirm_password &&
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>
                            <span role='alert'>{errors.confirm_password}</span>
                          </div>
                        </div>
                      }
                    </div>
                  </div> */}
              </div>
            </div>
          </div>

          <div className='d-flex justify-content-end me-5 mb-5 '>
            <button type='submit' className='btn btn-primary'>
              {!loading && (
                <span className='indicator-label'>{intl.formatMessage({id: 'Form.Edit'})} </span>
              )}
              {loading && (
                <span className='indicator-progress' style={{display: 'block'}}>
                  {intl.formatMessage({id: 'Form.Pleasewait'})}{' '}
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
