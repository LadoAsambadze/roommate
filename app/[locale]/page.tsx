import initTranslations from '../../utils/i18n'
const i18nNamespaces = ['common']

async function Home({ params: { locale } }: { params: { locale: string } }) {
    const { t } = await initTranslations(locale, i18nNamespaces)

    return (
        <main>
            <h1>home</h1>
        </main>
    )
}

export default Home
