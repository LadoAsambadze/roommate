interface AnsweredQuestion {
    [key: string | number]: string | object | Array<string | object> | number | Question | null
}

interface Question {
    value?: string | number
    label?: string

}

export type FormDataProps = {
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
    answeredQuestions: AnsweredQuestion[]
}
