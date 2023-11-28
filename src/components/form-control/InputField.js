import { TextField } from '@mui/material'
import React from 'react'
import { Controller } from 'react-hook-form'
import PropTypes from 'prop-types';



export default function InputField(props) {

    const { placeholder, name, form, type = 'text', color = 'success' } = props
    const hasError = form.formState.errors[name]



    return (
        <Controller
            name={name}
            control={form.control}
            render={({ field }) =>
                <TextField
                    id="outlined-helperText"
                    placeholder={placeholder}
                    type={type}
                    color={color}
                    fullWidth
                    size="small"
                    {...field}
                    error={!!hasError}
                    helperText={form.formState.errors[name]?.message}
                    onBlur={() => {
                        form.trigger(name);
                    }}
                />
            }
        />
    )
}

InputField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    disabled: PropTypes.bool
}
