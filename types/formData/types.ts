interface AnsweredQuestion {
    [key: string]: string | object | Array<string | object>
}

interface Question {
    value: string | number
    label: string
}

export type FormDataProps = {
    firstname?: string
    lastname?: string
    birthDate?: string
    phone?: string
    password?: string
    confirmPassword?: string
    countryId?: Question | number
    genderId?: Question | number
    email?: string
    code?: number | string
    answeredQuestions: AnsweredQuestion[]
}
