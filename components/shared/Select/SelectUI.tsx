/* eslint-disable @typescript-eslint/no-explicit-any */

import { components } from 'react-select'
import { IconDropdown } from '../../svgs'
import './index.css'

export const DropdownIndicator = (props: any) => {
    return (
        components.DropdownIndicator && (
            <components.DropdownIndicator {...props}>
                <IconDropdown
                    classname="w-1 h-1"
                    style={{ transform: props.isFocused ? null : 'rotate(180deg)' }}
                />
            </components.DropdownIndicator>
        )
    )
}
export const customStyles = {
    control: (provided: any, state: any) => ({
        ...provided,

        border: state.isFocused ? '1px solid #e75a80' : '1px solid #828bab',
        outline: state.isFocused ? '1px solid #e75a80' : 'none',

        padding: state.isFocused ? '8px 12px 8px 12px' : '8px 12px 8px 12px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '14px',
        boxShadow: 'none',

        '&:hover': {
            outline: state.isFocused ? '1px solid #e75a80' : 'none',
        },
    }),
    DropdownIndicator,
    indicatorSeparator: (provided: any) => ({
        ...provided,
        display: 'none',
    }),
}
