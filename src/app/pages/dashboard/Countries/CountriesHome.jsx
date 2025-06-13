import React, {useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import axiosInstance from '../../../api/axios'
import Swal from 'sweetalert2'
import {KTSVG, toAbsoluteUrl} from '../../../../_metronic/helpers'
import {Link, useNavigate} from 'react-router-dom'
import {motion} from 'framer-motion'
import ReactTable from '../../../../_metronic/partials/widgets/React_Table/ReactTable'
import {Skeleton, Pagination} from '@mui/material'
import useAuthContext from '../../../Auth/AuthContext'

const CountriesHome = () => {
  const intl = useIntl()
  const [loading, setLoading] = useState(false)
  const [Items, setItems] = useState(null)

  // const {check_role} = useAuthContext()
  // const navigate = useNavigate()

  // const [check, setCheck] = useState({
  //   browse: false,
  //   add: false,
  //   show: false,
  //   edit: false,
  //   delete: false,
  // })

  const CustomDiv = () => (
    <div className='row flex-end w-100'>
        <div className='col-auto'>
          <Link to='/Add-Countries' type='button' className='btn btn-primary'>
            <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
            {intl.formatMessage({id: 'Country.Create'})}
          </Link>
        </div>
    </div>
  )

  const get_data = async () => {
    setLoading(true)
    const {data} = await axiosInstance.get('/admin-countries')
    setItems(data)
    setLoading(false)
  }

  const Delete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          const {data} = await axiosInstance.delete(`/admin-countries/${id}`)
          if (!data || data.length === 0) {
            throw new Error(JSON.stringify(data))
          }
          get_data()
        } catch (error) {
          Swal.showValidationMessage(`Request failed: ${error}`)
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Done!',
          icon: 'success',
        })
      }
    })
  }

  const columns = [
    {
      Header: intl.formatMessage({id: 'Table.ID'}),
      accessor: 'id',
      Cell: (row) => <div className='w-100 flex-center'>#{row.row.original.id}</div>,
    },
    {
      Header: intl.formatMessage({id: 'Table.DescriptionEN'}),
      accessor: 'DescriptionEN',
      Cell: (row) => <div className='w-100 flex-center'>{row.row.original.name_en}</div>,
    },
    {
      Header: intl.formatMessage({id: 'Table.DescriptionAR'}),
      accessor: 'DescriptionAR',
      Cell: (row) => <div className='w-100 flex-center'>{row.row.original.name_ar}</div>,
    },
    {
      Header: intl.formatMessage({id: 'Table.File'}),
      accessor: 'File',
      Cell: (row) => (
        <div className='symbol symbol-50px'>
          <img
            src={
              row.row.original.img
                ? process.env.REACT_APP_IMAGE_PATH + row.row.original.img
                : toAbsoluteUrl('media/avatars/300-6.jpg')
            }
            alt=''
          />
        </div>
      ),
    },
    {
      Header: intl.formatMessage({id: 'Table.Action'}),
      Cell: (row) => (
        <div className='d-flex flex-center'>
            <Link
              to={`/Edit-Countries/${row.row.original.id}`}
              className='btn me-2 btn-light-primary'
            >
              {intl.formatMessage({id: 'Table.Edit'})}
            </Link>
            <button
              onClick={() => Delete(row.row.original.id)}
              className='btn me-2 btn-light-danger'
            >
              {intl.formatMessage({id: 'Table.Delete'})}
            </button>
        </div>
      ),
    },
  ]

  useEffect(() => {
    // setCheck({
    //   browse: check_role('browse-countries'),
    //   add: check_role('add-countries'),
    //   show: check_role('show-countries'),
    //   edit: check_role('edit-countries'),
    //   delete: check_role('delete-countries'),
    // })

    // if (!check_role('browse-countries')) {
    //   navigate('/')
    // }

    get_data()
  }, [])



  return (
    <motion.nav
      initial={{opacity: 0, x: 100}}
      animate={{opacity: 1, x: 0, transition: {duration: 0.3}}}
      exit={{opacity: 0, x: 100, transition: {duration: 0.2}}}
    >
      <div className='mb-5 mt-5 d-flex flex-stack'>
        <div className='page-title d-flex flex-column justify-content-center flex-wrap me-3'>
          <h1 className='page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0'>
            {intl.formatMessage({id: 'Menu.Countries'})}
          </h1>
          <ul className='breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1'>
            <li className='breadcrumb-item text-muted'>{intl.formatMessage({id: 'Menu.Home'})}</li>
            <li className='breadcrumb-item'>
              <span className='bullet bg-gray-400 w-5px h-2px'></span>
            </li>
            <li className='breadcrumb-item text-muted'>
              {intl.formatMessage({id: 'Menu.Countries'})}
            </li>
          </ul>
        </div>
      </div>

      {Items !== null && !loading ? (
        <>
          <div className=''>
            <ReactTable columns={columns} data={Items} customComponent={<CustomDiv />} />
          </div>
        </>
      ) : (
        <div className='row'>
          <div className='col-12'>
            <Skeleton
              variant='rounded'
              animation='wave'
              sx={{width: '100%', height: '90vh', marginTop: '1vh'}}
            />
          </div>
        </div>
      )}
    </motion.nav>
  )
}

export default CountriesHome
