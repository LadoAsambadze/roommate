import initTranslations from '../../utils/i18n'
import ConnectSection from './_components/ConnectSection'
import ContactSection from './_components/ContactSection'
import FeaturesSection from './_components/FeaturesSection'
import ReviewsSection from './_components/ReviewsSection'
const i18nNamespaces = ['common']

async function Home({ params: { locale } }: { params: { locale: string } }) {
    const { t } = await initTranslations(locale, i18nNamespaces)

    return (
        <main>
            <h1>{t('hello')}</h1>
            <FeaturesSection />
            <ConnectSection />
            <ContactSection />
            <ReviewsSection />
        </main>
    )
}

export default Home
