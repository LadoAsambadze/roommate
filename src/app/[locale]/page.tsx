import BlogSection from './(main)/_components/BlogSection'
import ConnectSection from './(main)/_components/ConnectSection'
import ContactSection from './(main)/_components/ContactSection'
import FeatureSection from './(main)/_components/FeatureSection'
import QuestionSection from './(main)/_components/QuestionSection'
import ReviewSection from './(main)/_components/ReviewSection'
import SuggestSection from './(main)/_components/SuggestSection'

import { getClient } from '@/src/libs/apollo/rscClient'
import { query } from '@/graphql/restLinkQuery'
import CoverSection from './(main)/_components/CoverSection'
import ApartmentSection from './(main)/_components/ApartmentSection'

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
