import CoverSection from '@/src/components/home/CoverSection'
import BlogSection from '../../components/home/BlogSection'
import ConnectSection from '../../components/home/ConnectSection'
import ContactSection from '../../components/home/ContactSection'
import FeatureSection from '../../components/home/FeatureSection'
import QuestionSection from '../../components/home/QuestionSection'
import ReviewSection from '../../components/home/ReviewSection'
import SuggestSection from '../../components/home/SuggestSection'
import ApartmentSection from '@/src/components/home/ApartmentSection'
import { getClient } from '../../libs/apollo/rscClient'
import { query } from '@/graphql/restLinkQuery'

async function Home() {
    const response = await getClient().query({ query, fetchPolicy: 'cache-first' })

    return (
        <main className="h-full w-full">
            <CoverSection />
            <FeatureSection />
            <BlogSection />
            <SuggestSection />
            <ApartmentSection flats={response?.data?.flats?.data} />
            <ConnectSection />
            <ContactSection />
            <ReviewSection />
            <QuestionSection />
        </main>
    )
}

export default Home
