interface AnsweredQuestion {
    [key: string | number]: string | object | Array<string | object> | number | Question | null
}

interface Question {
    value?: string | number
    label?: string

}

export type FormDataPropsTwo = {

    answeredQuestions: AnsweredQuestion[]
}
