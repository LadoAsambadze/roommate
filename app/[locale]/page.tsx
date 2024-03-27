import { Button } from '@/components/ui/button'
import initTranslations from '../../utils/i18n'
import { BankIcon } from '@/components/svgs'
import { getClient } from '@/libs/client'

import Test from '@/components/Test'
import { gql } from '@apollo/client'

export const revalidate = 5
const query = gql`
    query ExampleQuery($locale: Language) {
        getGenders(locale: $locale) {
            id
            translations {
                id
                sex
                lang
            }
        }
    }
`
const i18nNamespaces = ['home']

async function Home({ params: { locale } }: { params: { locale: string } }) {
    const { t } = await initTranslations(locale, i18nNamespaces)
    const client = getClient()

    const { data } = await client.query({ query })

    console.log('server', data)

    return (
        <main>
            <p className="font-firaGo">{t('hello')}</p>
            <p className="font-bgCaps">შემთხვევითად გენერირებული ტექსტი</p>
            <p className="font-firaGo">Hello my name is </p>
            <p className="font-bgCaps">Hello my name is </p>
            <Button className="font-bgCaps">ღილაკი</Button>
            <BankIcon className="text-4xl" />
            <h1>try</h1>
            <h1 className="text-[black]">{data.getGenders[0].id}</h1>
            <Test />
        </main>
    )
}

export default Home
