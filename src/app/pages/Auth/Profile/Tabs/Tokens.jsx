import React, { useEffect, useState } from 'react'
import ReactTable from '../../../../../_metronic/partials/widgets/React_Table/ReactTable';
import { Skeleton } from '@mui/material';
import { useIntl } from 'react-intl';
import Swal from 'sweetalert2';
import axiosInstance from '../../../../api/axios';
import { useNavigate } from 'react-router-dom';
import useAuthContext from '../../../../Auth/AuthContext';
import moment from 'moment';

export const Tokens = ({ tokens, get_data }) => {
  const [Items, setItems] = useState(null)
  const intl = useIntl()
  const navigate = useNavigate();
  const { check_role } = useAuthContext()

  const Delete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert ",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      showLoaderOnConfirm: true,
      preConfirm: async (login) => {
        try {
          const { data } = await axiosInstance.delete(`/admin-countries/${id}`);
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
      Header: intl.formatMessage({ id: 'Table.Location' }), accessor: 'location',
      Cell: row => (
        <div className=" w-100 flex-center">
          {row.row.original.location}
        </div>
      )
    },
    {
      Header: intl.formatMessage({ id: 'Table.IP' }), accessor: 'ip',
      Cell: row => (
        <div className=" w-100 flex-center">
          {row.row.original.ip}
        </div>
      )
    },
    {
      Header: intl.formatMessage({ id: 'Table.userAgent' }), accessor: 'userAgent',
      Cell: row => (
        <div className=" w-100 flex-center">
          {row.row.original.userAgent}
        </div>
      )
    },
    {
      Header: intl.formatMessage({ id: 'Table.browser' }), accessor: 'browser',
      Cell: row => (
        <div className=" w-100 flex-center">
          {row.row.original.browser}
        </div>
      )
    },
    {
      Header: intl.formatMessage({ id: 'Table.OS' }), accessor: 'os',
      Cell: row => (
        <div className=" w-100 flex-center">
          {row.row.original.os}
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
    {
      Header: intl.formatMessage({ id: 'Table.Action' }),
      Cell: row => (
        <div className="d-flex flex-center">
          <button onClick={(e) => Delete(row.row.original.id)} className='btn me-2  btn-light-danger'> {intl.formatMessage({ id: 'Table.Signout' })}  </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (!check_role('show-users-tokens')) {
      navigate('/')
    }
    if (tokens) {
      setItems(tokens)
    }
  }, [tokens])
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
