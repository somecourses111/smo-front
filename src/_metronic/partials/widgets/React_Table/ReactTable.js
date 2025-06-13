import React from 'react';
import { useTable, usePagination, useSortBy, useGlobalFilter } from 'react-table';
import { GlobalFilter } from '../../../../app/pages/dashboard/GlobalFilter';
import { FaArrowCircleDown, FaArrowCircleUp } from 'react-icons/fa';
import { useIntl } from 'react-intl';

const ReactTable = ({ columns, data, customComponent  , pageSize = null}) => {
  const intl = useIntl();

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 , pageSize: pageSize ?? 10 }, // Added initial state
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex } = state;
  return (
    <div className='card'>
      <div className='card-header border-0 pt-6'>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <div className='card-toolbar col-6 flex-end'>
          {customComponent}
        </div>
      </div>
      <div className="card-body py-4">
        <div id="kt_table_users_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
          <div className="table-responsive">
            <table className="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer" id="kt_table_users" {...getTableProps()}>
              <thead>
                {headerGroups.map(headerGroup => (
                  <tr className='text-start text-muted fw-bold fs-7 text-uppercase gs-0' {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                      <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                        {column.render('Header')}
                        <span>
                          {column.isSorted ? (column.isSortedDesc ? <FaArrowCircleDown className='ms-2' /> : <FaArrowCircleUp className='ms-2' />) : ''}
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
                        <td {...cell.getCellProps()}>
                          {cell.render('Cell')}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className='text-end mt-3'>
            <button type='button' className="btn btn-active-light-primary me-3" onClick={() => previousPage()} disabled={!canPreviousPage}>
              Previous
            </button>
            <span>
              Page{' '}
              <strong>
                {pageIndex + 1} of {Math.ceil(data.length / state.pageSize)}
              </strong>{' '}
            </span>
            <button type='button' className="btn btn-active-light-primary ms-3" onClick={() => nextPage()} disabled={!canNextPage}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReactTable;
