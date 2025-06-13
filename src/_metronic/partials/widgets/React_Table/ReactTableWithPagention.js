// Table.js
import React, { useState } from 'react';
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import { GlobalFilter } from '../../../../app/pages/dashboard/GlobalFilter';
import { FaArrowCircleDown, FaArrowCircleUp } from 'react-icons/fa';
import { KTSVG } from '../../../helpers';
import { useIntl } from 'react-intl';
import { GlobalFilterPagention } from '../../../../app/pages/dashboard/GlobalFilterPagention';

const ReactTableWithPagention =  ({ columns, data, customComponent ,currentPage,totalPages, handlePrevPage, handleNextPage,  setInputValue , inputValue}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
  } = useTable({ columns, data }, useGlobalFilter, useSortBy, usePagination);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
  };

 

  return (
    <div  className='card'>
      <div className='card-header border-0 pt-6'>
            <GlobalFilterPagention  handleChange={handleChange}  inputValue={inputValue}/>
            <div className='card-toolbar col-6 flex-end '>
                {customComponent}
            </div>
      </div>
      <div className="card-body py-4">
        <div id="kt_table_users_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer"   >
          <div className="table-responsive">
            <table  className="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer "  id="kt_table_users"{...getTableProps()} >
              <thead>
                {headerGroups.map(headerGroup => (
                  <tr className='text-start text-muted fw-bold fs-7 text-uppercase gs-0' {...headerGroup.getHeaderGroupProps()}   >
                    {headerGroup.headers.map(column => (
                      <th  {...column.getHeaderProps(column.getSortByToggleProps())} >
                        {column.render('Header')}
                        <span>
                          {column.isSorted ?  (column.isSortedDesc ?<FaArrowCircleDown  className='ms-2'/>: <FaArrowCircleUp className='ms-2'/>):''}
                        </span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map(row => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map(cell => (
                        <td  {...cell.getCellProps()}  >
                          {cell.render('Cell')}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className='text-end mt-3' >
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
             <button className={ currentPage === totalPages ? "btn btn-bg-dark btn-color-white ms-3" : "btn btn-active-light-primary ms-3"} onClick={() => handleNextPage()} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReactTableWithPagention;
