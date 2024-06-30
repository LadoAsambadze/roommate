/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconDropdown } from '../../svgs'
import { X } from 'lucide-react'
import ReactSelect, {
    DropdownIndicatorProps as ReactSelectDropdownIndicatorProps,
    ClearIndicatorProps as ReactSelectClearIndicatorProps,
    GroupBase,
    components,
    Props as ReactSelectProps,
} from 'react-select'

import { cn } from '@/src/utils/cn'
import { useState } from 'react'
import { useRootCssVar } from '@/src/hooks/useRootCssVar'

type DropdownIndicatorProps = ReactSelectDropdownIndicatorProps<
    unknown,
    boolean,
    GroupBase<unknown>
> & {
    isMenuOpen: boolean
}

export const DropdownIndicator = (props: DropdownIndicatorProps) => {
    const { isMenuOpen, ...dropdownIndicatorProps } = props

    return (
        components.DropdownIndicator && (
            <components.DropdownIndicator {...dropdownIndicatorProps}>
                <IconDropdown
                    className={cn({
                        'rotate-180': isMenuOpen,
                    })}
                />
            </components.DropdownIndicator>
        )
    )
}

type ClearIndicatorProps = ReactSelectClearIndicatorProps<unknown, boolean, GroupBase<unknown>>

export const ClearIndicator = (props: ClearIndicatorProps) => {
    return (
        components.ClearIndicator && (
            <components.ClearIndicator {...props}>
                <X className="h-5 w-5" />
            </components.ClearIndicator>
        )
    )
}

export const customStyles = {
    control: (provided: any, state: { isFocused: boolean }) => ({
        ...provided,
        border: !state.isFocused ? '1px solid #828bab' : '1px solid #3dae8c',
        padding: '8px 12px 8px 12px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '12px',
        height: '40px',
        boxShadow: state.isFocused ? 'inset 0 0 0 1px #3dae8c' : 'none',
        transition: 0,

        '&:hover': {},
    }),
    indicatorSeparator: (provided: any) => ({
        ...provided,
        display: 'none',
    }),
}

type SelectProps = ReactSelectProps & {
    showFocusBorder: boolean
}

const Select = (props: SelectProps) => {
    const { isMulti, showFocusBorder = false, ...restReactSelectProps } = props

    const primaryGreenColor = useRootCssVar('--primaryGreen')

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    // state: { isFocused: boolean }

    const customStyles = {
        // main container(wrapper)
        control: (baseStyles: any) => {
            return {
                ...baseStyles,
                border: showFocusBorder
                    ? !isMenuOpen
                        ? '1px solid #828bab'
                        : `1px solid ${primaryGreenColor}`
                    : '1px solid #828bab',
                borderRadius: 8,
                cursor: 'pointer',
                minHeight: 40,
                boxShadow: showFocusBorder
                    ? isMenuOpen
                        ? `inset 0 0 0 1px ${primaryGreenColor}`
                        : 'none'
                    : 'none',
                transition: 0,

                '&:hover': {},
            }
        },
        valueContainer: (baseStyles: any) => ({
            ...baseStyles,
            padding: '8px 12px',
            margin: isMulti ? '-2.5px -3.5px' : 0,
        }),

        // input
        input: (baseStyles: any) => ({
            ...baseStyles,
            padding: 0,
            margin: 0,
        }),
        placeholder: (baseStyles: any) => ({
            ...baseStyles,
            margin: 0,
        }),

        // multi value items
        multiValue: (baseStyles: any) => ({
            ...baseStyles,
            margin: isMulti ? '2.5px 3.5px' : 0,
        }),
        multiValueLabel: (baseStyles: any) => ({
            ...baseStyles,
            padding: 0,
            fontSize: '100%',
        }),

        // indicator(close, dropdown)
        indicatorsContainer: (baseStyles: any) => ({
            ...baseStyles,
            padding: '8px 12px 8px 0',
        }),
        indicatorSeparator: (baseStyles: any) => ({
            ...baseStyles,
            display: 'none',
        }),
        clearIndicator: (baseStyles: any) => ({
            ...baseStyles,
            padding: 0,
            marginRight: 7,
        }),
        dropdownIndicator: (baseStyles: any) => ({
            ...baseStyles,
            padding: 0,
            width: 'auto',
        }),
    }

    const handleMenuOpen = () => {
        setIsMenuOpen((prevState: boolean) => !prevState)

        if (typeof restReactSelectProps.onMenuOpen === 'function') {
            restReactSelectProps.onMenuOpen()
        }
    }

    const handleMenuClose = () => {
        setIsMenuOpen((prevState: boolean) => !prevState)

        if (typeof restReactSelectProps.onMenuClose === 'function') {
            restReactSelectProps.onMenuClose()
        }
    }

    return (
        <ReactSelect
            {...restReactSelectProps}
            styles={customStyles}
            components={{
                ...restReactSelectProps.components,
                DropdownIndicator: (props) => (
                    <DropdownIndicator {...props} isMenuOpen={isMenuOpen} />
                ),
                ClearIndicator: (props) => <ClearIndicator {...props} />,
            }}
            isMulti
            onMenuOpen={handleMenuOpen}
            onMenuClose={handleMenuClose}
            placeholder="placeholder"
            options={[
                { value: 1, label: 'option 1' },
                { value: 2, label: 'option 2' },
                { value: 3, label: 'option 3' },
                { value: 4, label: 'option 4' },
                { value: 5, label: 'option 5' },
                { value: 6, label: 'option 6' },
            ]}
        />
    )
}

export default Select

/**
 * TODO:
 * 1. ReactSelect base props review/rewrite
 */
