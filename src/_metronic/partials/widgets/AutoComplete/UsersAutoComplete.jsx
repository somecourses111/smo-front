import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../../app/api/axios';
import { Autocomplete,  TextField,} from '@mui/material';

const UsersAutoComplete = ({setValue ,value }) => {
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);
    const fetchOptions = async (query) => {
      try {
        const response = await axiosInstance.get('/user-autocomplete', {
          params: {
            query : query ,
            type : 'search' 
         },
        });

        setOptions(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      fetchOptions(inputValue);
    }, [inputValue]);

  return (
    <div >
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
    </div>
  )
}

export default UsersAutoComplete