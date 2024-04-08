export type LangChooseProps = {
    className: string
    spanClassname: string
}

export type AccordionItems = {
    value: string
    question: string
    answer: string
}

interface Params {
    locale: string
    // define other properties here
}

export type SearchParams = {
    params: Params
}
