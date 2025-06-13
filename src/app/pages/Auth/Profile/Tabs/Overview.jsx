import moment from 'moment'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { KTSVG } from '../../../../../_metronic/helpers'
import { useNavigate } from 'react-router-dom'
import useAuthContext from '../../../../Auth/AuthContext'

export const Overview = ({ data }) => {
  const intl = useIntl()
  const navigate = useNavigate();
  const { check_role } = useAuthContext()
  const CustomDiv = ({ label, value }) => (
    <div className='row my-5'>
      <label className='col-lg-4  fs-5 fw-bold text-muted'>{label}  </label>
      <div className='col-lg-8'>
        <span className='fw-bolder fs-5 text-dark'>{value ?? '---'}</span>
      </div>
    </div>
  )
  useEffect(() => {
    if (!check_role('show-users')) {
        navigate('/')
    }
}, [])
  return (
    <div className='row flex-between'>
      <div className="col-6">
        <div className="card card-flush ">
          <div className="card-header">
            <div className="card-title">
              <h2>{intl.formatMessage({ id: 'Table.UserInfo' })} </h2>
            </div>
          </div>
          <div className="card-body pt-0">
            <div id='kt_account_connected_accounts1' className='collapse show'>
              <div className='py-2'>
                <CustomDiv label={intl.formatMessage({ id: 'Table.ID' })} value={data.overview.id} />
                <CustomDiv label={intl.formatMessage({ id: 'Table.National_id' })} value={data.overview.national_id} />
                <CustomDiv label={intl.formatMessage({ id: 'Table.Name' })} value={data.overview.name} />
                <CustomDiv label={intl.formatMessage({ id: 'Table.Email' })} value={data.overview.email} />
                <CustomDiv label={intl.formatMessage({ id: 'Table.Phone' })} value={data.overview.phone} />
                <CustomDiv label={intl.formatMessage({ id: 'Table.Create_at' })} value={moment(data.overview.created_at).format('YYYY-MM-DD')} />
                <CustomDiv label={intl.formatMessage({ id: 'Table.verified_at' })} value={moment(data.overview.verified_at).format('YYYY-MM-DD')} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-6">
        <div className="card  card-flush">
          <div className="card-header">
            <div className="card-title">
              <h2>{intl.formatMessage({ id: 'Table.Orders' })} </h2>
            </div>
          </div>
          <div className="card-body pt-0">
            <div className="row flex-between">


                <div  className='col-12 my-2 collapse show'>
                    <div className='d-flex align-items-center bg-light-primary rounded p-3 '>
                      <span className='svg-icon svg-icon-primary me-5'>
                        <KTSVG path='/media/icons/duotune/abstract/abs027.svg' className='svg-icon-1' />
                      </span>
                      <div className='flex-grow-1 me-2'>
                        <a href='#' className='fw-bold text-gray-800 text-hover-primary fs-6'>
                        {intl.formatMessage({ id: 'Table.Total_Orders' })}
                        </a>
                        <span className='text-muted fw-semibold d-block'>{data.overview.orders.total_orders}</span>
                      </div>
                    </div>
                </div>


                <div  className='col-12 my-2 collapse show'>
                    <div className='d-flex align-items-center bg-light-success rounded p-3 '>
                      <span className='svg-icon svg-icon-success me-5'>
                        <KTSVG path='/media/icons/duotune/abstract/abs027.svg' className='svg-icon-1' />
                      </span>
                      <div className='flex-grow-1 me-2'>
                        <a href='#' className='fw-bold text-gray-800 text-hover-primary fs-6'>
                        {intl.formatMessage({ id: 'Table.completed_Orders' })}
                        </a>
                        <span className='text-muted fw-semibold d-block'>{data.overview.orders.completed}</span>
                      </div>
                      <span className='fw-bold text-success py-1'>{(100 * data.overview.orders.completed / data.overview.orders.total_orders).toFixed(2)}%</span>
                    </div>
                </div>

  
                <div  className='col-12 my-2 collapse show'>
                    <div className='d-flex align-items-center bg-light-warning rounded p-3 '>
                      <span className='svg-icon svg-icon-warning me-5'>
                        <KTSVG path='/media/icons/duotune/abstract/abs027.svg' className='svg-icon-1' />
                      </span>
                      <div className='flex-grow-1 me-2'>
                        <a href='#' className='fw-bold text-gray-800 text-hover-primary fs-6'>
                        {intl.formatMessage({ id: 'Table.pending_Orders' })}
                        </a>
                        <span className='text-muted fw-semibold d-block'>{data.overview.orders.pending}</span>
                      </div>
                      <span className='fw-bold text-warning py-1'>{(100 * data.overview.orders.pending / data.overview.orders.total_orders).toFixed(2)}%</span>
                    </div>
                </div>

  
                <div  className='col-12 my-2 collapse show'>
                    <div className='d-flex align-items-center bg-light-danger rounded p-3 '>
                      <span className='svg-icon svg-icon-danger me-5'>
                        <KTSVG path='/media/icons/duotune/abstract/abs027.svg' className='svg-icon-1' />
                      </span>
                      <div className='flex-grow-1 me-2'>
                        <a href='#' className='fw-bold text-gray-800 text-hover-primary fs-6'>
                        {intl.formatMessage({ id: 'Table.failed_Orders' })}
                        </a>
                        <span className='text-muted fw-semibold d-block'>{data.overview.orders.failed}</span>
                      </div>
                      <span className='fw-bold text-danger py-1'>{(100 * data.overview.orders.failed / data.overview.orders.total_orders).toFixed(2)}%</span>
                    </div>
                </div>

  

          
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}
