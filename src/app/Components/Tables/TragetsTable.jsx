import React, { useEffect, useMemo, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import { useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';
import { FaArrowCircleDown, FaArrowCircleUp } from 'react-icons/fa';

export const TragetsTable = ({Targets}) => {
    const COLUMNS = useMemo(
        () =>    [
           
            {
                Header :'User Diamonds',
                accessor:'user_diamonds',
            },
            {
                Header :'User Hours',
                accessor:'user_hours',
            },
            {
                Header :'User Days',
                accessor:'user_days',
            },
          
            {
                Header :'Agency Obtained',
                accessor:'agency_obtain',
            },
            {
                Header :'At Time',
                accessor:'updated_at',
            },

        ],
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        state,
        page,
        setPageSize,
        setGlobalFilter, 
        prepareRow,
    } = useTable({
        columns : COLUMNS,
        data : Targets
    },
        useGlobalFilter ,
        useSortBy ,
        usePagination
    )
    const {globalFilter , pageIndex , PageSize} = state; // for search input
    useEffect(()=>{
        setPageSize('20')
    },[])
  return (
    <div className="card mt-3">
            <div className="card-body py-4">
                <div id="kt_table_users_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer"   >
                <div className="table-responsive">
                    <table className="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer" {...getTableProps()} id="kt_table_users">
                    <thead>
                        {// Loop over the header rows
                            headerGroups.map(headerGroup => (
                                // Apply the header row props
                                <tr className='text-start text-muted fw-bold fs-7 text-uppercase gs-0' {...headerGroup.getHeaderGroupProps()}>
                                    {// Loop over the headers in each row
                                    headerGroup.headers.map(column => (
                                        // Apply the header cell props
                                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {// Render the header
                                        column.render('Header')}
                                            <span>
                                            {column.isSorted ? (column.isSortedDesc ?<FaArrowCircleDown  className='ms-2'/>: <FaArrowCircleUp className='ms-2'/>):''}
                                        </span>
                                        </th>
                                    ))}
                                </tr>
                            ))
                        }
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {// Loop over the table rows
                        page.map(row => {
                            // Prepare the row for display
                            prepareRow(row)
                            return (
                            // Apply the row props
                            <tr {...row.getRowProps()}>
                                {// Loop over the rows cells
                                row.cells.map(cell => {
                                // Apply the cell props
                                return (
                                    <td {...cell.getCellProps()}>
                                    {// Render the cell contents
                                    cell.render('Cell')}
                                    </td>
                                )
                                })}
                            </tr>
                            )
                        })}
                    </tbody>
                    </table>
                    </div>
                    
                </div>
            </div>

    </div>
  )
}
