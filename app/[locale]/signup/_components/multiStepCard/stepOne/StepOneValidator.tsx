'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import 'react-phone-number-input/style.css'
import { isValidPhoneNumber } from 'react-phone-number-input'
import { useTranslation } from 'react-i18next'
import { FormDataPropsOne } from './types'

export function StepOneValidator({ formData }: { formData: FormDataPropsOne }) {
    const { t } = useTranslation()

    const formSchema: z.ZodSchema<FormDataPropsOne> = z.object({
        firstname: z.string().min(2, { message: t('nameError') }),
        lastname: z.string().min(2, { message: t('surnameError') }),
        genderId: z
            .object({
                value: z.union([z.string(), z.number()]).optional(),
                label: z.string().optional(),
            })
            .refine((obj) => Object.keys(obj).length >= 1, {
                message: t('selectCountry'),
            }),
        countryId: z
            .object({
                value: z
                    .string()
                    .min(1, { message: t('selectCountry') })
                    .optional(),
                label: z.any().optional(),
            })
            .refine((obj) => Object.keys(obj).length >= 1, {
                message: t('selectCountry'),
            }),
        birthDate: z.string().min(1, { message: t('selectAge') }),

        phone: z
            .string()
            .min(1, t('PhonenumberError'))
            .refine((value) => isValidPhoneNumber(value), {
                message: t('incorrectFormat'),
            }),
        email: z.string().email(t('emailError')).optional().or(z.literal('')),
        password: z
            .string()
            .min(6, { message: t('minpass') })
            .refine((value) => /(?=.*[0-9])(?=.*[^0-9]).{6,30}/.test(value), {
                message: t('passwordValidationError'),
            }),
        confirmPassword: z.string().refine((value) => value === form.getValues().password, {
            message: t('passwordMatchError'),
        }),
        code: z.string().optional(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstname: formData.firstname ? formData.firstname : '',
            lastname: formData.lastname ? formData.lastname : '',
            genderId: formData.genderId ? formData.genderId : null,
            countryId: formData?.countryId ? formData.countryId : null,
            birthDate: formData.birthDate ? formData.birthDate : '',
            email: formData.email ? formData.email : '',
            phone: formData.phone ? formData.phone : '',
            password: formData.password ? formData.password : '',
            confirmPassword: formData.confirmPassword ? formData.confirmPassword : '',
            code: formData.code ? formData.code : '',
        },
    })

    return form
}
