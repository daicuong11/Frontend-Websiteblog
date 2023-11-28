import * as React from 'react';

import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';





export default function DateField(props) {
  const { name, form, color = 'success'} = props
  return (
    
        <Controller
            name={name}
            control={form.control}
            render={({field}) => 
  
                   <TextField
                   focused={color}
                    type="date" 
                    {...field}
                    className='w-full'
                    
                   /> 
              
            }
        />  
   
    
  );
}

DateField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,

}
