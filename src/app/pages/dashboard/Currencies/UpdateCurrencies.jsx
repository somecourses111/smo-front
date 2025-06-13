import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../../api/axios';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { KTSVG } from '../../../../_metronic/helpers';
import { MdCloudUpload } from 'react-icons/md';
import useAuthContext from '../../../Auth/AuthContext';

export const UpdateCurrencies = () => {
  const intl = useIntl()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const { check_role } = useAuthContext()


  const [data, setData] = useState({
    name_en: null,
    name_ar: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };



  const handleEdit_Add_submit = async (event) => {
    setLoading(true)
    event.preventDefault()
    const formData = new FormData()
    formData.append('enctype', 'multipart/form-data');
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append('_method', 'PATCH');

    try {
      await axiosInstance.post(`/admin-Currency/${id}`, formData).then(response => {
        Swal.fire({
          title: "Success",
          icon: "success",
          confirmButtonText: "OK",
        });
        setLoading(false)
        setErrors([])
        navigate(`/Currencies`)
      })
    } catch (e) {
      console.log(e.response.data.errors);
      if (e.response.status === 422) {
        setLoading(false)
        setErrors(e.response.data.errors)
      }
    }
  }
  const get_data = async () => {
    await axiosInstance.get(`/admin-Currency/${id}`).then(function (res) {
      const response = res.data;
      setData({
        name_en: response.name_en,
        name_ar: response.name_ar,
      });
    })
  }

  useEffect(() => {
    if (!check_role('show-currencies')) {
      navigate('/')
    }
    get_data()
  }, [])
  return (
    <motion.nav
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0, transition: { duration: 0.3 } }}
      exit={{ opacity: 0, x: 100, transition: { duration: 0.2 } }} >
      <div className=" mb-5 mt-5 d-flex flex-stack">
        <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
          <h1 className="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">{intl.formatMessage({ id: 'Currency.Edit' })}</h1>
          <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
            <li className="breadcrumb-item text-muted">
              <span className="text-muted text-hover-primary"> {intl.formatMessage({ id: 'Menu.Home' })}</span>
            </li>
            <li className="breadcrumb-item">
              <span className="bullet bg-gray-400 w-5px h-2px"></span>
            </li>
            <li className="breadcrumb-item text-muted">{intl.formatMessage({ id: 'Menu.Currencies' })}</li>
          </ul>
        </div>
        <div>
          <Link to='/Currencies' type='button' className='btn btn-primary' >
            <KTSVG path='/media/icons/duotune/arrows/arr002.svg' className='svg-icon-2' />
            {intl.formatMessage({ id: 'Form.GoBack' })}
          </Link>
        </div>
      </div>
      <div id="kt_app_content_container" className="app-container container-xxl">
        <form onSubmit={handleEdit_Add_submit} id="kt_ecommerce_add_category_form" className="form d-flex flex-column flex-lg-row fv-plugins-bootstrap5 fv-plugins-framework" data-kt-redirect="../../demo1/dist/apps/ecommerce/catalog/categories.html">
          <div className="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">
            <div className="card card-flush py-4">
              <div className="card-header">
                <div className="card-title">
                  <h2>{intl.formatMessage({ id: 'Form.General' })} </h2>
                </div>
              </div>

              <div className="card-body pt-0">
                <div className="mb-3 fv-row fv-plugins-icon-container">
                  <label className="required form-label"> {intl.formatMessage({ id: 'Form.NameEN' })}  </label>
                  <input type="text" name="name_en" className="form-control mb-2" value={data.name_en} onChange={handleChange} placeholder={intl.formatMessage({ id: 'Form.NameEN' })} />
                  <div className="fv-plugins-message-container invalid-feedback" />
                  {errors.name_en &&
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>
                        <span role='alert'>{errors.name_en}</span>
                      </div>
                    </div>
                  }
                </div>

                <div className="mb-3 fv-row fv-plugins-icon-container">
                  <label className="required form-label"> {intl.formatMessage({ id: 'Form.NameAR' })}</label>
                  <input type="text" name="name_ar" className="form-control mb-2" value={data.name_ar} onChange={handleChange} placeholder={intl.formatMessage({ id: 'Form.NameAR' })} />
                  <div className="fv-plugins-message-container invalid-feedback" />
                  {errors.name_ar &&
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>
                        <span role='alert'>{errors.name_ar}</span>
                      </div>
                    </div>
                  }
                </div>

              </div>
            </div>
            <div className="d-flex justify-content-end ">
              {check_role('edit-currencies') && (
                <button type="submit" className="btn btn-primary">
                  {!loading && <span className='indicator-label'>{intl.formatMessage({ id: 'Form.Edit' })} </span>}
                  {loading && (
                    <span className='indicator-progress' style={{ display: 'block' }}>
                      {intl.formatMessage({ id: 'Form.Pleasewait' })}{' '}
                      <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                    </span>
                  )}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

    </motion.nav>
  )
}
