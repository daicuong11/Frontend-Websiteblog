import Select from 'react-select';
import React from 'react'
import { Controller } from 'react-hook-form'

export default function MultiSelect(props) {
    const { name, menu = [], form } = props
    const hasError = form.formState.errors[name]
    console.log(hasError)
    return (
        <>
            <Controller
            name={name}
            control={form.control}
            render={({ field }) =>
                <Select
                    className={`w-full custom-select-class`}
                    classNamePrefix="select"
                    defaultValue={[]}
                    isClearable={true}
                    isSearchable={true}
                    isMulti={true}
                    options={menu}
                    
                    {...field}
                    styles={{
                        option: (provided, state) => ({
                            ...provided,
                            backgroundColor: state.isSelected ? 'green' : 'white',
                            color: state.isSelected ? 'white' : 'green',
                           
                        }),
                      
                    }}
                />

            }
        />
        {hasError && <p className="pl-4 mt-1 text-red-600 text-xs">{hasError?.message}</p>}
        </>
    )
}
