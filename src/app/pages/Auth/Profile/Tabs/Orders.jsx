import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import axiosInstance from '../../../../api/axios'
import Swal from 'sweetalert2'
import ReactTable from '../../../../../_metronic/partials/widgets/React_Table/ReactTable'
import { Link, Skeleton } from '@mui/material'
import { Images } from '../../../../../_metronic/partials/widgets/React_Table/Images'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import useAuthContext from '../../../../Auth/AuthContext'

export const Orders = ({orders , get_data}) => {
  const intl = useIntl()
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState([])
  const navigate = useNavigate();
  const { check_role } = useAuthContext()
  const CheckOrder = (id) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert the Changes!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Check it!',
        showLoaderOnConfirm: true,
        preConfirm: async (login) => {
            try {
                const { data } = await axiosInstance.get(`/admin-order-check/${id}`);
                if (!data || data.length === 0) {
                    throw new Error(JSON.stringify(data));
                }
                get_data()
            } catch (error) {
                Swal.showValidationMessage(`
                  Request failed: ${error}
              `);
            }
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Done!",
                icon: "success"
            });
        }
    });

  }

  const send_mail = (id) => {
      Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert the Changes!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, Check it!',
          showLoaderOnConfirm: true,
          preConfirm: async (login) => {
              try {
                  const { data } = await axiosInstance.get(`/admin-order-send-vouchars/${id}`);
                  if (!data || data.length === 0) {
                      throw new Error(JSON.stringify(data));
                  }
                  get_data()
              } catch (error) {
                  Swal.showValidationMessage(`
                    Request failed: ${error}
                `);
              }
          },
          allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
          if (result.isConfirmed) {
              Swal.fire({
                  title: "Done!",
                  icon: "success"
              });
          }
      });

  }

  const columns = [
      {
          Header: intl.formatMessage({ id: 'Table.ID' }),
          accessor: 'id',
          Cell: ({ row }) => (
              <div className="w-100 flex-center">
                  # {row.original.id}
              </div>
          )
      },
      {
          Header: intl.formatMessage({ id: 'Table.Total' }),
          accessor: 'total',
          Cell: ({ row }) => (
              <div className="w-100 flex-center">
                  {row.original.total}
              </div>
          )
      },
      {
          Header: intl.formatMessage({ id: 'Table.Status' }),
          accessor: 'status',
          Cell: ({ row }) => (
              <div className="w-100 flex-center">
                  {row.original.status === 'failed' &&
                      <span className="badge badge-light-danger">{row.original.status}</span>
                  }

                  {row.original.status === 'pending' &&
                      <span className="badge badge-light-warning">{row.original.status}</span>
                  }

                  {row.original.status === 'completed' &&
                      <span className="badge badge-light-success">{row.original.status}</span>
                  }
              </div>
          )
      },
      {
          Header: intl.formatMessage({ id: 'Table.AdminApproved' }),
          accessor: 'admin_approved',
          Cell: ({ row }) => (
              <div className="w-100 flex-center">
                  {row.original.admin_approved === 'refused' &&
                      <span className="badge badge-light-danger">{row.original.admin_approved}</span>
                  }

                  {row.original.admin_approved === 'pending' &&
                      <span className="badge badge-light-warning">{row.original.admin_approved}</span>
                  }

                  {row.original.admin_approved === 'approved' &&
                      <span className="badge badge-light-success">{row.original.admin_approved}</span>
                  }
              </div>
          )
      },
      {
          Header: intl.formatMessage({ id: 'Table.payment_type' }),
          accessor: 'payment_type',
          Cell: ({ row }) => (
              <div className="w-100 flex-center">
                  {row.original.payment_type}
              </div>
          )
      },
      {
          Header: intl.formatMessage({ id: 'Table.Date' }),
          accessor: 'created_at',
          Cell: ({ row }) => (
              <div className="w-100 flex-center">
                  {moment(row.original.created_at).format('YYYY-MM-DD hh:mm:ss A')}
              </div>
          )
      },

      {
          Header: intl.formatMessage({ id: 'Table.Action' }),
          Cell: ({ row }) => (
              <div className="d-flex flex-center w-100">
                  
                  <Link to={`/Order-details/${row.original.id}`} className='btn me-2 btn-light-primary'>
                      {intl.formatMessage({ id: 'Table.View' })}
                  </Link>
                  <button onClick={() => CheckOrder(row.original.id)} className='btn me-2 btn-light-primary w-100'>
                      {intl.formatMessage({ id: 'Table.CheckOrder' })}
                  </button>
                  <button onClick={() => send_mail(row.original.id)} className='btn me-2 btn-light-primary w-100'>
                      {intl.formatMessage({ id: 'Table.SendVouchers' })}
                  </button>
              </div>
          )
      }
  ];

  useEffect(() => {
    if (!check_role('show-users-orders')) {
        navigate('/')
    }
      if(orders){
          setItems(orders)
      }
  },[orders])
  return (
    <div>
      {!loading ?
        <ReactTable  columns={columns} data={items}  customComponent={<></>} />
        :
        <div className="row">
            <div className="col-12">
                <Skeleton variant="rounded" animation="wave" sx={{ width: '100%', height: '90vh', marginTop: '1vh' }} />
            </div>
        </div>
    }
    </div>
  )
}
