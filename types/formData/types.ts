interface AnsweredQuestion {
    [key: string]: string | object | Array<string | object>
}

export type FormDataProps = {
    countryId?:
        | {
              label: string
              value: string | number
          }
        | number
    genderId?:
        | {
              label: string
              value: string | number
          }
        | number

    email?: string
    code?: number
    answeredQuestions: AnsweredQuestion[]
}
