import Select from 'react-select';
import React from 'react'
import { Controller } from 'react-hook-form'

export default function SelectSingle(props) {
    const { name, menu = [], form } = props
    
    return (
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
                    options={menu}
                    {...field}
                    styles={{
                        option: (provided, state) => ({
                            ...provided,
                            backgroundColor: state.isSelected ? 'green' : 'white',
                            color: state.isSelected ? 'white' : 'green',
                        }),
                        control: (provided, state) => ({
                            ...provided,
                            borderColor: state.isFocused ? 'green' : 'gray',
                        }),
                    }}
                />

            }
        />
    )
}
