/* eslint-disable @typescript-eslint/no-explicit-any */
import PhoneInputWithCountrySelect from 'react-phone-number-input'
import './index.css'

export default function PhoneInput({ field, labels, form }: any) {
    return (
        <PhoneInputWithCountrySelect
            {...field}
            labels={labels}
            defaultCountry="GE"
            international
            value={field.value}
            onChange={(phone: any) => {
                form.setValue('phone', phone)
            }}
        />
    )
}
