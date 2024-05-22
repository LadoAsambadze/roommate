interface Question {
    value?: string | number
    label?: string
}

export type FormDataPropsOne = {
    firstname?: string | undefined
    lastname?: string | undefined
    birthDate?: string | undefined
    phone?: string | undefined
    password?: string | undefined
    confirmPassword?: string | undefined
    countryId?: Question | number | null | undefined
    genderId?: Question | number | null | undefined
    email?: string | undefined
    code?: number | string | undefined
}
