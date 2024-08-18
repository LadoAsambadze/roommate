/* eslint-disable @typescript-eslint/no-explicit-any */
import PhoneInputWithCountrySelect from 'react-phone-number-input'

export default function PhoneInput({ field, labels, form }: any) {
    return (
        <PhoneInputWithCountrySelect
            labels={labels}
            defaultCountry="GE"
            international
            value={field?.value}
            onChange={(phone) => {
                form?.setValue('phone', phone)
            }}
        />
    )
}

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React from 'react'
// import PhoneInputWithCountrySelect from 'react-phone-number-input'
// import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js'

// export default function PhoneInput({ field, labels, form }: any) {
//     const validatePhoneNumber = (phoneNumber: string) => {
//         try {
//             if (isValidPhoneNumber(phoneNumber)) {
//                 const parsedNumber = parsePhoneNumber(phoneNumber)
//                 form.setValue('phone', parsedNumber.format('E.164'))
//                 form.setError('phone', undefined)
//             } else {
//                 form.setError('phone', { type: 'manual', message: 'Invalid phone number' })
//             }
//         } catch (error) {
//             console.error('Phone number validation error:', error)
//             form.setError('phone', { type: 'manual', message: 'Error validating phone number' })
//         }
//     }

//     return (
//         <PhoneInputWithCountrySelect
//             labels={labels}
//             defaultCountry="GE"
//             international
//             value={field?.value}
//             onChange={(phone) => {
//                 if (phone) {
//                     validatePhoneNumber(phone)
//                 } else {
//                     form.setValue('phone', '')
//                     form.setError('phone', undefined)
//                 }
//             }}
//         />
//     )
// }
