import React, { useEffect, useState } from 'react'
import ReactTable from '../../../../../_metronic/partials/widgets/React_Table/ReactTable';
import { Skeleton } from '@mui/material';
import { useIntl } from 'react-intl';
import Swal from 'sweetalert2';
import axiosInstance from '../../../../api/axios';
import moment from 'moment';
import { Images } from '../../../../../_metronic/partials/widgets/React_Table/Images';
import { useNavigate } from 'react-router-dom';
import useAuthContext from '../../../../Auth/AuthContext';

export const Vouchers = ({ vouchers, get_data }) => {
  const [Items, setItems] = useState(null)
  const intl = useIntl()
  const navigate = useNavigate();
  const { check_role } = useAuthContext()
  
  const TruncateString = ({ text }) => {
    const truncatedText = text ? text.slice(0, 50) : '';
    return truncatedText;
  };

  const columns = [
    {
      Header: intl.formatMessage({ id: 'Table.ID' }), accessor: 'id',
      Cell: row => (
        <div className=" w-100 flex-center">
          # {row.row.original.id}
        </div>
      )
    },
    {
      Header: intl.formatMessage({ id: 'Table.OrderID' }), accessor: 'order_detail.order_id',
      Cell: row => (
        <div className=" w-100 flex-center">
          # {row.row.original.order_detail.order_id}
        </div>
      )
    },
    {
      Header: intl.formatMessage({ id: 'Table.Product' }), accessor: 'item.name_en',
      Cell: row => (
        <div className='d-flex align-items-center ps-3'>
          <Images img={row.row.original.item.img} name={row.row.original.item.name_en} />
          <div className='flex-grow-1'>
            <div className='text-dark fw-bold text-hover-primary text-start fs-6'>
              <TruncateString text={row.row.original.item.name_en} />
            </div>
          </div>
        </div>
      )
    },
    {
      Header: intl.formatMessage({ id: 'Table.Pin' }), accessor: 'pin',
      Cell: row => (
        <div className=" w-100 flex-center">
          {row.row.original.pin}
        </div>
      )
    },
    {
      Header: intl.formatMessage({ id: 'Table.Code' }), accessor: 'serial',
      Cell: row => (
        <div className=" w-100 flex-center">
          {row.row.original.serial}
        </div>
      )
    },
    {
      Header: intl.formatMessage({ id: 'Table.Date' }),
      accessor: 'created_at',
      Cell: ({ row }) => (
        <div className="w-100 flex-center">
          {moment(row.original.created_at).format("YYYY-MM-DD hh:mm:ss A")}
        </div>
      )
    },


  ];

  useEffect(() => {
    if (!check_role('show-users-vouchers')) {
      navigate('/')
    }
    if (vouchers) {
      setItems(vouchers)
    }
  }, [vouchers])
  return (
    <div>
      {Items !== null ?
        <ReactTable columns={columns} data={Items} customComponent={<></>} />
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
