import React, {useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import {useNavigate, useParams} from 'react-router-dom'
import axiosInstance from '../../api/axios'
import {motion} from 'framer-motion'
import {KTSVG} from '../../../_metronic/helpers'
import {Box, Skeleton, Tab, Tabs} from '@mui/material'
import {Overview} from './Profile/Tabs/Overview'
import {Settings} from './Profile/Tabs/Settings'
import {Orders} from './Profile/Tabs/Orders'
import {Tokens} from './Profile/Tabs/Tokens'
import {Vouchers} from './Profile/Tabs/Vouchers'
import {FaPhoneAlt, FaUserAlt, FaUserCircle} from 'react-icons/fa'
import useAuthContext from '../../Auth/AuthContext'

const UserProfile = () => {
  const intl = useIntl()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState([])
  const navigate = useNavigate()
  // const { id } = useParams();
  const [value, setValue] = useState(0)
  const {check_role, user} = useAuthContext()

  const [check, setCheck] = useState({
    vouchers: false,
    tokens: false,
    overview: false,
    orders: false,
    settings: false,
  })

  const [data, setData] = useState({
    overview: null,
    orders: null,
    tokens: null,
    vouchers: null,
  })

  const get_data = async () => {
    setLoading(true)
    await axiosInstance.get(`/admin-users/${user.id}`).then(function (res) {
      const response = res.data.data
      console.log(response.data)
      setData({
        overview: response.overview,
        orders: response.orders,
        tokens: response.tokens,
        vouchers: response.vouchers,
      })
    })
    setLoading(false)
  }

  useEffect(() => {
    if (!check_role('show-users')) {
      navigate('/')
    }
    setCheck({
      vouchers: check_role('show-users-vouchers'),
      tokens: check_role('show-users-tokens'),
      orders: check_role('show-users-orders'),

      show: check_role('show-users'),
      edit: check_role('edit-users'),
    })

    get_data()
  }, [])
  return (
    <motion.nav
      initial={{opacity: 0, x: 100}}
      animate={{opacity: 1, x: 0, transition: {duration: 0.3}}}
      exit={{opacity: 0, x: 100, transition: {duration: 0.2}}}
    >
      <div className=' mb-5 mt-5 d-flex flex-stack'>
        <div className='page-title d-flex flex-column justify-content-center flex-wrap me-3'>
          <h1 className='page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0'>
            {intl.formatMessage({id: 'User.Edit'})}
          </h1>
          <ul className='breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1'>
            <li className='breadcrumb-item text-muted'>
              <span className='text-muted text-hover-primary'>
                {' '}
                {intl.formatMessage({id: 'Menu.Home'})}
              </span>
            </li>
            <li className='breadcrumb-item'>
              <span className='bullet bg-gray-400 w-5px h-2px'></span>
            </li>
            <li className='breadcrumb-item text-muted'>{intl.formatMessage({id: 'Menu.Users'})}</li>
          </ul>
        </div>
        <div>
          <button onClick={() => navigate(-1)} type='button' className='btn btn-primary'>
            <KTSVG path='/media/icons/duotune/arrows/arr002.svg' className='svg-icon-2' />
            {intl.formatMessage({id: 'Form.GoBack'})}
          </button>
        </div>
      </div>
      {!loading && data.overview ? (
        <div>
          <div className='card mb-3 mb-xl-5'>
            <div className='card-body pt-9 pb-0'>
              <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
                <div className='me-7 mb-4'>
                  <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
                    {data.overview.img ? (
                      <img
                        src={`${process.env.REACT_APP_IMAGE_PATH}${data.overview.img}`}
                        alt='User profile'
                      />
                    ) : (
                      <FaUserCircle className='' size={70} />
                    )}

                    <div className='position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px'></div>
                  </div>
                </div>

                <div className='flex-grow-1'>
                  <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
                    <div className='d-flex flex-column'>
                      <span className='text-gray-800 text-hover-primary fs-8 fw-bolder  '>
                        {intl.formatMessage({id: 'Table.ID'})} : {data.overview.id}
                      </span>
                      <div className='d-flex align-items-center mb-2'>
                        <span className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
                          {data.overview.name}
                        </span>
                        {data.overview.email_verified_at && (
                          <span>
                            <KTSVG
                              path='/media/icons/duotune/general/gen026.svg'
                              className='svg-icon-1 svg-icon-primary'
                            />
                          </span>
                        )}
                      </div>

                      <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                        <span className='d-flex align-items-center text-gray-400 text-hover-primary mb-2 me-3'>
                          <KTSVG
                            path='/media/icons/duotune/communication/com006.svg'
                            className='svg-icon-4 me-1'
                          />
                          {data.overview.type}
                        </span>
                        {data.overview.email && (
                          <span className='d-flex align-items-center text-gray-400 text-hover-primary mb-2 me-3'>
                            <KTSVG
                              path='/media/icons/duotune/communication/com011.svg'
                              className='svg-icon-4 me-1'
                            />
                            {data.overview.email}
                          </span>
                        )}
                        {data.overview.phone && (
                          <span className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'>
                            <FaPhoneAlt className='svg-icon-4 me-1' />
                            {data.overview.phone}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* <div className='d-flex my-4'>
                                            <button className='btn btn-sm btn-danger me-2' data-bs-toggle='modal' data-bs-target='#kt_modal_offer_a_deal'  >
                                                Delete
                                            </button>
                                        </div> */}
                  </div>
                  <div className='d-flex flex-wrap flex-stack'>
                    <div className='d-flex flex-column flex-grow-1 pe-8'>
                      <div className='d-flex flex-wrap'>
                        <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                          <div className='d-flex align-items-center flex-center '>
                            <div className='fw-bold fs-6 text-gray-400 text-center me-3'>
                              {intl.formatMessage({id: 'Table.Level'})}{' '}
                            </div>
                            <div className='fs-2 fw-bolder '>
                              {' '}
                              {data.overview.level ? data.overview.level.name_en : '---'}{' '}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className='d-flex align-items-center w-200px w-sm-300px flex-column mt-3'>
                                            <div className='d-flex justify-content-between w-100 mt-auto mb-2'>
                                            <div className='symbol symbol-50px me-3 '>
                                                    <img src={process.env.REACT_APP_IMAGE_PATH + user.overview.levels.receiver_img} className='w-100' alt='' />
                                            </div>
                                            <div className='symbol symbol-50px me-3 '>
                                                    <img src={process.env.REACT_APP_IMAGE_PATH + user.overview.levels.sender_img} className='w-100' alt='' />
                                            </div>
                                            </div>
                                            <div className="d-flex justify-content-between w-100 mt-auto mb-2 ">
                                                <div className="col-6 text-center">
                                                {intl.formatMessage({id: 'Table.ReceiverLevel'})}
                                                </div>
                                                <div className="col-6 text-center">
                                                {intl.formatMessage({id: 'Table.SenderLevel'})}
                                                </div>
                                            </div>
                                        </div> */}
                  </div>
                </div>
              </div>

              <div className='d-flex overflow-auto '>
                <Box sx={{width: '100%'}}>
                  <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs value={value} aria-label='basic tabs example'>
                      {check.show && (
                        <Tab
                          label={intl.formatMessage({id: 'Menu.overview'})}
                          onClick={(e) => setValue(0)}
                        />
                      )}
                      {check.edit && (
                        <Tab
                          label={intl.formatMessage({id: 'Menu.settings'})}
                          onClick={(e) => setValue(1)}
                        />
                      )}
                      {check.orders && (
                        <Tab
                          label={intl.formatMessage({id: 'Menu.Orders'})}
                          onClick={(e) => setValue(2)}
                        />
                      )}
                      {check.tokens && (
                        <Tab
                          label={intl.formatMessage({id: 'Menu.Tokens'})}
                          onClick={(e) => setValue(3)}
                        />
                      )}
                      {check.vouchers && (
                        <Tab
                          label={intl.formatMessage({id: 'Menu.Vouchers'})}
                          onClick={(e) => setValue(4)}
                        />
                      )}
                    </Tabs>
                  </Box>
                </Box>
              </div>
            </div>
          </div>

          <div>
            {value === 0 && check.show && <Overview data={data} />}
            {value === 1 && check.edit && <Settings user={data.overview} get_data={get_data} />}
            {value === 2 && check.orders && <Orders orders={data.orders} get_data={get_data} />}
            {value === 3 && check.tokens && <Tokens tokens={data.tokens} get_data={get_data} />}
            {value === 4 && check.vouchers && (
              <Vouchers vouchers={data.vouchers} get_data={get_data} />
            )}
          </div>
        </div>
      ) : (
        <div className='row'>
          <div className='col-12'>
            <Skeleton
              variant='rounded'
              animation='wave'
              sx={{width: '100%', height: '30vh', marginTop: '1vh'}}
            />
            <Skeleton
              variant='rounded'
              animation='wave'
              sx={{width: '100%', height: '70vh', marginTop: '1vh'}}
            />
          </div>
        </div>
      )}
    </motion.nav>
  )
}

export default UserProfile
