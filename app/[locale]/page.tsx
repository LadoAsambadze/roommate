import initTranslations from '../../utils/i18n'
import ConnectSection from './_components/ConnectSection'
import ContactSection from './_components/ContactSection'
import FeatureSection from './_components/FeatureSection'
import QuestionSection from './_components/QuestionSection'
import ReviewSection from './_components/ReviewSection'

const i18nNamespaces = ['common']

async function Home({ params: { locale } }: { params: { locale: string } }) {
    const { t } = await initTranslations(locale, i18nNamespaces)

    return (
        <main>
            <h1>{t('hello')}</h1>
            <FeatureSection />
            <ConnectSection />
            <ContactSection />
            <ReviewSection />
            <QuestionSection/>
        </main>
    )
}

export default Home
