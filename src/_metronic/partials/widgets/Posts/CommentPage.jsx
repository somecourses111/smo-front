import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion';
import { FormControl, InputLabel, MenuItem, Select, Skeleton, TextField } from '@mui/material'
import { useIntl } from 'react-intl';
import axiosInstance from '../../../../app/api/axios';
import { NewChat } from '../NewChat/NewChat';

const CommentPage = () => {
    const { id, type } = useParams()
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const intl = useIntl()
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const get_data = async () => {
        setLoading(true)
        const { data } = await axiosInstance.get(`/admin-posts-comments?page=${currentPage}`, {
            params: { id: id, type: type },
        })
        console.log(data.data);
        setData(data.data)
        setLoading(false)
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
    }, [currentPage])

    return (
        <motion.nav
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0, transition: { duration: 0.3 } }}
            exit={{ opacity: 0, x: 100, transition: { duration: 0.2 } }} >
            <div className=" mb-5 mt-5 d-flex flex-stack">
                <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                    <h1 className="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">{intl.formatMessage({ id: 'Menu.Comments' })}</h1>
                    <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
                        <li className="breadcrumb-item text-muted">
                            <span className="text-muted text-hover-primary"> {intl.formatMessage({ id: 'Menu.Home' })}</span>
                        </li>
                        <li className="breadcrumb-item">
                            <span className="bullet bg-gray-400 w-5px h-2px"></span>
                        </li>
                        <li className="breadcrumb-item text-muted">{intl.formatMessage({ id: 'Menu.Comments' })}</li>
                    </ul>
                </div>
            </div>
            <div className='card' id='kt_chat_messenger'>
                {data !== null && !loading ?
                data.length > 0 ?
                <>
                    <NewChat   get_data={get_data} endpoint={null} data={data}/>
                    <div className='text-center my-3 ' >
                        <button className={ currentPage === 1 ? "btn btn-bg-dark btn-color-white me-3 " : "btn btn-active-light-primary me-3"} onClick={() => handlePrevPage()} disabled={currentPage === 1}>
                        Previous
                        </button>
                    {' '}
                    <span>
                        Page{' '}
                        <strong>
                        {currentPage } of {totalPages}
                        </strong>{' '}
                    </span>
                    <button className={ currentPage === totalPages ? "btn btn-bg-dark btn-color-white ms-3" : "btn btn-primary ms-3"} onClick={() => handleNextPage()} disabled={currentPage === totalPages}>
                        Next
                    </button>
                    </div>
                </>
                :
                <h6>No Data</h6>
                    :
                    <Skeleton variant="rounded" animation="wave" sx={{ width: '100%', height: '90vh', marginTop: '1vh' }} />
                }
            </div>
        </motion.nav>
    )
}

export default CommentPage