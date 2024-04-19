export type StepOneProps = {
    firstname: string
    lastname: string
    birthDate: string
    phone: string
    password: string
    confirmPassword?: string
    countryId: { value?: string | number; label?: string } | null
    genderId: { value?: string | number; label?: string } | null
    email?: string
    code?: number | string
}
