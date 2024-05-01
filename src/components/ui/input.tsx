/* eslint-disable react/display-name */
import * as React from 'react'
import { cn } from '@/src/utils/cn'
// import errorIcon from '../../../public/imgs/Error.svg'
// import successIcon from '../../../public/imgs/Success.svg'
// import Image from 'next/image'
import { Button } from './button'
import { useTranslation } from 'react-i18next'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    hasError?: boolean
    isSuccess?: boolean
    getCode?: boolean
    clicked?: boolean
    onGetCodeClick?: () => void
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, hasError, isSuccess, getCode, onGetCodeClick, clicked, ...props }, ref) => {
        const { t } = useTranslation()
        return (
            <div className="relative flex w-full items-center">
                <input
                    type={type}
                    className={cn(
                        'flex h-11 w-full rounded-lg border border-borderColor bg-[#FFFFFF] px-3 py-3 text-sm placeholder:text-placeholderColor  focus-visible:border-none focus-visible:outline-inputFocusColor',
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {hasError && (
                    <div className="absolute right-4 top-3">
                        {/* <Image src={errorIcon} alt="Error Icon" width={24} height={24} /> */}
                    </div>
                )}
                {isSuccess && (
                    <div className="absolute right-4 top-3">
                        {/* <Image src={successIcon} alt="Success Icon" width={24} height={24} /> */}
                    </div>
                )}
                {getCode && (
                    <div className="absolute right-4">
                        <Button
                            variant="default"
                            type="button"
                            className="right-2"
                            onClick={() => {
                                if (onGetCodeClick) {
                                    onGetCodeClick()
                                }
                            }}
                        >
                            {clicked ? t('resend') : t('getCode')}
                        </Button>
                    </div>
                )}
            </div>
        )
    }
)

export { Input }
