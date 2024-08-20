import { z } from 'zod'

export const landlordsSignupSchema = z.object({
    firstname: z.string().min(1, { message: '' }),
    lastname: z.string().min(1, { message: '' }),
    email: z.string().min(1, { message: '' }),
    password: z.string().min(1, { message: '' }),
    confirmPassword: z.string().min(1, { message: '' }),
})

export type SignupLandlordsFormValues = z.infer<typeof landlordsSignupSchema>
