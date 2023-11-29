import { MenuItem, TextField } from '@mui/material'
import React from 'react'
import { Controller } from 'react-hook-form'

export default function SelectField(props) {
    const { name, color = '', defaultOption = 'Lựa chọn', defaultValue = -1, menu = [], form, defaultSelect = "", onChange } = props
    const hasError = form.formState.errors[name]
    return (
        <Controller
            name={name}
            control={form.control}
            render={({ field }) =>
                <TextField
                    className='outline-none border-none'
                    id="outlined-select-currency"
                    select
                    {...field}
                    color={color}
                    fullWidth
                    size='small'
                    error={!!hasError}
                    helperText={form.formState.errors[name]?.message}
                    onBlur={() => {
                        form.trigger(name);
                    }}
                    onChange={(e) =>{
                        field.onChange(e)
                        if(onChange) {
                            onChange()
                        }
                    }}
                    // defaultValue={defaultSelect ?? ""}
                >
                    <MenuItem value={defaultValue}>{defaultOption}</MenuItem>
                    {menu.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option?.name}
                        </MenuItem>
                    ))}
                </TextField>

            }
        />
    )
}
