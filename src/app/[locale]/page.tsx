import CoverSection from '@/src/components/home/CoverSection'
import BlogSection from '../../components/home/BlogSection'
import ConnectSection from '../../components/home/ConnectSection'
import ContactSection from '../../components/home/ContactSection'
import FeatureSection from '../../components/home/FeatureSection'
import QuestionSection from '../../components/home/QuestionSection'
import ReviewSection from '../../components/home/ReviewSection'
import SuggestSection from '../../components/home/SuggestSection'
import ApartmentSection from '@/src/components/home/ApartmentSection'
import { client } from '../../libs/graphql/restLink'
import { query } from '@/graphql/restLinkQuery'

async function getFlats() {
    try {
        const response = await client.query({ query, fetchPolicy: 'cache-first' })
        return response?.data?.flats?.data
    } catch (error) {
        return null
    }
}

async function Home() {
    const flats = await getFlats()

    return (
        <main className="h-full w-full">
            <CoverSection />
            <FeatureSection />
            <BlogSection />
            <SuggestSection />
            <ApartmentSection flats={flats} />
            <ConnectSection />
            <ContactSection />
            <ReviewSection />
            <QuestionSection />
        </main>
    )
}

export default Home
