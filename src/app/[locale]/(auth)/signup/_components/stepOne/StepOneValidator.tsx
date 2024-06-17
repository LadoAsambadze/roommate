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
            birthDate: z.string().min(1)
            .refine((value) => {
                const today = new Date();
                const birthDate = new Date(value);
                let age = today.getFullYear() - birthDate.getFullYear();
                const m = today.getMonth() - birthDate.getMonth();
                if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }
                return age >= 18;
            }, { message: t('ageValidationError') }),

        phone: z.string().refine((value) => isValidPhoneNumber(value), {
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
            firstname: formData.firstname ? formData.firstname : undefined,
            lastname: formData.lastname ? formData.lastname : undefined,
            genderId: formData.genderId ? formData.genderId : undefined,
            countryId: formData?.countryId ? formData.countryId : undefined,
            birthDate: formData.birthDate ? formData.birthDate : '',
            email: formData.email ? formData.email : undefined,
            phone: formData.phone ? formData.phone : undefined,
            password: formData.password ? formData.password : undefined,
            confirmPassword: formData.confirmPassword ? formData.confirmPassword : undefined,
            code: formData.code ? formData.code : undefined,
        },
    })



    return form
}
