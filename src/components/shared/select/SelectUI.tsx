/* eslint-disable @typescript-eslint/no-explicit-any */

import { DropdownIndicatorProps, GroupBase, components } from 'react-select'
import { IconDropdown } from '../../svgs'
import { JSX } from 'react'

export const DropdownIndicator = (
    props: JSX.IntrinsicAttributes & DropdownIndicatorProps<unknown, boolean, GroupBase<unknown>>
) => {
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
    control: (provided: any, state: { isFocused: any }) => ({
        ...provided,
        border: '1px solid #828bab',
        outline: state.isFocused ? '1px solid #3dae8c' : 'none',
        padding: '8px 12px 8px 12px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '12px',
        boxShadow: 'none',
        height: '40px auto',
        '&:hover': {
            outline: state.isFocused ? '1px solid #3dae8c' : 'none',
        },
    }),
    DropdownIndicator,
    indicatorSeparator: (provided: any) => ({
        ...provided,
        display: 'none',
    }),
}
