import React, {useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import {useNavigate, useParams} from 'react-router-dom'
import axiosInstance from '../../../api/axios'
import {motion} from 'framer-motion'
import {KTSVG} from '../../../../_metronic/helpers'
import {Box, Skeleton, Tab, Tabs} from '@mui/material'
import {Overview} from './Tabs/Overview'
import {Settings} from './Tabs/Settings'
import {Orders} from './Tabs/Orders'
import {Tokens} from './Tabs/Tokens'
import {Vouchers} from './Tabs/Vouchers'
import {FaPhoneAlt, FaUserAlt} from 'react-icons/fa'
import useAuthContext from '../../../Auth/AuthContext'

const UserProfile = () => {
  const intl = useIntl()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState([])
  const navigate = useNavigate()
  const [value, setValue] = useState(0)
  const { user} = useAuthContext()

  const [data, setData] = useState({
    overview: null,
    orders: null,
    tokens: null,
    vouchers: null,
  })

  const get_data = async (user_id) => {
    setLoading(true)
    await axiosInstance.get(`/admin-users/${user_id}`).then(function (res) {
      const response = res.data.data
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
    if(user)
    {
        get_data(user.id)
    }
  }, [user])
  
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
                    <img
                      src={process.env.REACT_APP_IMAGE_PATH + data.overview.img}
                      alt='Metornic'
                    />
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
                  </div>
                </div>
              </div>

              <div className='d-flex overflow-auto '>
                <Box sx={{width: '100%'}}>
                  <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs value={value} aria-label='basic tabs example'>
                      <Tab
                        label={intl.formatMessage({id: 'Menu.overview'})}
                        onClick={(e) => setValue(0)}
                      />
                      <Tab
                        label={intl.formatMessage({id: 'Menu.settings'})}
                        onClick={(e) => setValue(1)}
                      />
                      <Tab
                        label={intl.formatMessage({id: 'Menu.Orders'})}
                        onClick={(e) => setValue(2)}
                      />
                      <Tab
                        label={intl.formatMessage({id: 'Menu.Tokens'})}
                        onClick={(e) => setValue(3)}
                      />
                      <Tab
                        label={intl.formatMessage({id: 'Menu.Vouchers'})}
                        onClick={(e) => setValue(4)}
                      />
                    </Tabs>
                  </Box>
                </Box>
              </div>
            </div>
          </div>

          <div>
            {value === 0 && <Overview data={data} />}
            {value === 1 && <Settings user={data.overview} get_data={get_data} />}
            {value === 2 && <Orders orders={data.orders} get_data={get_data} />}
            {value === 3 && <Tokens tokens={data.tokens} get_data={get_data} />}
            {value === 4 &&  <Vouchers vouchers={data.vouchers} get_data={get_data} /> }
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
