import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion';
import { FormControl, InputLabel, MenuItem, Select, Skeleton, TextField } from '@mui/material'
import axiosInstance from '../../../../app/api/axios';
import { useIntl } from 'react-intl';
import { Images } from '../React_Table/Images';
import ReactTableWithPagention from '../React_Table/ReactTableWithPagention';

const LikesPage = () => {
    const { id, type } = useParams()
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const intl = useIntl()
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [inputValue, setInputValue] = useState(null);

    const get_data = async () => {
        setData([])
        const { data } = await axiosInstance.get(`/admin-posts-likes?page=${currentPage}`, {
            params: { id: id, type: type ,  'name':inputValue },
        })
        setData(data.data)
        setTotalPages(data.meta.last_page);
    }

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };
    useEffect(() => {
        get_data()
    }, [currentPage,inputValue])
    const columns = [
        { Header: intl.formatMessage({id: 'Table.User'}) ,
            accessor: row => `${row.user?.name} ${row.user?.id}`, 
            Cell: row => (
                row.row.original.user &&
                <div className='d-flex align-items-center ps-3'>
                    <Images img ={row.row.original.user.img} name={row.row.original.user.name} />
                    <div className='flex-grow-1'>
                    <div  className='text-dark fw-bold text-hover-primary text-start fs-6'>
                    {row.row.original.user.name}
                    </div>
                        <span className='text-muted d-block fw-semibold text-start'>#{row.row.original.user.id}</span>
                    </div>
                </div>
          ),
            // Define a custom filter function
            filter: (rows, id, filterValue) => {
                return rows.filter(row => {
                const user = row.values[id]; // id will be 'user' which is the accessor
                return (
                    user.toLowerCase().includes(filterValue.toLowerCase()) // Search on concatenated string
                );
                });
            }
      },
  ];
  return (
    <motion.nav
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0, transition: { duration: 0.3 } }}
    exit={{ opacity: 0, x: 100, transition: { duration: 0.2 } }} >
    <div className=" mb-5 mt-5 d-flex flex-stack">
        <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
            <h1 className="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">{intl.formatMessage({ id: 'Menu.Likes' })}</h1>
            <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
                <li className="breadcrumb-item text-muted">
                    <span className="text-muted text-hover-primary"> {intl.formatMessage({ id: 'Menu.Home' })}</span>
                </li>
                <li className="breadcrumb-item">
                    <span className="bullet bg-gray-400 w-5px h-2px"></span>
                </li>
                <li className="breadcrumb-item text-muted">{intl.formatMessage({ id: 'Menu.Likes' })}</li>
            </ul>
        </div>
    </div>
    <div className='card' id='kt_chat_messenger'>
        {data !== null && !loading ?
            <ReactTableWithPagention
                columns={columns} 
                data={data} 
                currentPage={currentPage} 
                totalPages={totalPages} 
                handlePrevPage={handlePrevPage}
                handleNextPage={handleNextPage}
                inputValue={inputValue}
                setInputValue={setInputValue}
                customComponent={<></>}
            />
            :
            <Skeleton variant="rounded" animation="wave" sx={{ width: '100%', height: '90vh', marginTop: '1vh' }} />
        }
    </div>
</motion.nav>
  )
}

export default LikesPage