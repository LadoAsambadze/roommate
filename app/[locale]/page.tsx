import { Button } from '@/components/ui/button'
import initTranslations from '../i18n'
const i18nNamespaces = ['home']

async function Home({ params: { locale } }: { params: { locale: string } }) {
    const { t } = await initTranslations(locale, i18nNamespaces)

    return (
        <main>
            <p className="font-firaGo">{t('hello')}</p>
            <p className="font-bgCaps">შემთხვევითად გენერირებული ტექსტი</p>
            <p className="font-firaGo">Hello my name is </p>
            <p className="font-bgCaps">Hello my name is </p>
            <Button className="font-bgCaps">ღილაკი</Button>
        </main>
    )
}

export default Home
