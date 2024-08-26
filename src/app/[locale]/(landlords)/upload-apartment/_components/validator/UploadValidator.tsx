import { zodResolver } from '@hookform/resolvers/zod'

import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function UploadValidator() {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/ // Define the date regex here
    const FormSchema = z.object({
        apartmentType: z
            .enum(['ბინა', 'კერძო სახლი', 'ოთახი', 'სტუდენტური სასტუმრო'], {
                errorMap: () => ({ message: 'გთხოვთ აირჩიოთ უძრავი ქონების ტიპი' }),
            })
            .nullish()
            .refine((val) => val !== null && val !== undefined, {
                message: 'გთხოვთ აირჩიოთ უძრავი ქონების ტიპი',
            }),

        date: z
            .string()
            .min(1, 'Date is required') // Use min(1) instead of nonempty
            .regex(dateRegex, 'Invalid date format (expected YYYY-MM-DD)'),
        // Add other fields here
    })



    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            apartmentType: 'ბინა',
            date: undefined,
        },
    })

    return form
}
