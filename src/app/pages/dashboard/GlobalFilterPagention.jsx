import React from 'react'
import { KTSVG } from '../../../_metronic/helpers'
import { useIntl } from 'react-intl'

export const GlobalFilterPagention = ({inputValue , handleChange}) => {
  const intl = useIntl()

  return (
      <div className='card-title'>
      {/* begin::Search */}
      <div className='d-flex align-items-center position-relative  my-1'>
        <KTSVG
          path='/media/icons/duotune/general/gen021.svg'
          className='svg-icon-1 position-absolute ms-6'
        />
        <input
          type='text'
          data-kt-user-table-filter='search'
          className='form-control form-control-solid w-250px ps-14 pt-3 pb-3'
          placeholder={intl.formatMessage({id: 'Table.Search'})}
          value={inputValue||''} onChange={handleChange}
        />
      </div>
      {/* end::Search */}
    </div>
   
  )
}
