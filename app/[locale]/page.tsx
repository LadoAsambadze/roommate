import Link from 'next/link'
import initTranslations from '../i18n'
import ExampleClientComponent from '@/components/ExaplmeClientComponent'
import { BankIcon } from '@/components/svg'

const i18nNamespaces = ['home']

async function Home({ params: { locale } }: { params: { locale: string } }) {
    const { t } = await initTranslations(locale, i18nNamespaces)

    return (
        <main>
            <h1 className="w-full text-xl hover:text-white">{t('hello')}</h1>
            <Link href="/about">{t('hello')}</Link>
            <ExampleClientComponent />
            <BankIcon className="" />
        </main>
    )
}

export default Home
