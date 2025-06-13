import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../../app/api/axios';
import { Autocomplete,  TextField,} from '@mui/material';

const BitaqatyCategoriesAutocomplete = ({setValue ,value }) => {
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);
    const fetchOptions = async (query) => {
      try {
        const appSecret = process.env.REACT_APP_BITAQATY_APP_SCREET.toString();
        const {data} = await axiosInstance.get('/Bitaqaty/get-Merchant-id', {
          headers: {
              'token': appSecret,
          }
      })
        setOptions(data);
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      fetchOptions();
    }, []);

  return (
    <div >
        {options.length > 0 ? 
        <Autocomplete
            value={value}
            onChange={(event, newValue) => {
            setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            id="controllable-states-demo"
            options={options}
            getOptionLabel={(option) => option.name} 
            getOptionSelected={(option, value) => option.id === value.id} 
            renderInput={(params) => <TextField {...params}  />}
        />
         :
        'loading ...'
        }
    </div>
  )
}

export default BitaqatyCategoriesAutocomplete