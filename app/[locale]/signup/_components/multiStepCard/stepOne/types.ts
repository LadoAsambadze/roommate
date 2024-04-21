interface Question {
    value?: string | number
    label?: string
}

export type FormDataPropsOne = {
    firstname?: string
    lastname?: string
    birthDate?: string
    phone?: string
    password?: string
    confirmPassword?: string
    countryId?: Question | number | null
    genderId?: Question | number | null
    email?: string
    code?: number | string
}
