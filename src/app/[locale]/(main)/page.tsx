import BlogSection from './_components/BlogSection'
import ConnectSection from './_components/ConnectSection'
import ContactSection from './_components/ContactSection'
import FeatureSection from './_components/FeatureSection'
import QuestionSection from './_components/QuestionSection'
import ReviewSection from './_components/ReviewSection'
import SuggestSection from './_components/SuggestSection'

import { getClient } from '@/src/libs/apollo/rscClient'
import { query } from '@/graphql/restLinkQuery'
import CoverSection from './_components/CoverSection'
import ApartmentSection from './_components/ApartmentSection'

async function Home() {
    const response = await getClient().query({ query, fetchPolicy: 'cache-first' })

    return (
        <main className="h-full w-full">
            <CoverSection />
            <FeatureSection />
            <BlogSection />
            <SuggestSection />
            {/* <ApartmentSection flats={response?.data?.flats?.data} /> */}
            <ConnectSection />
            <ContactSection />
            <ReviewSection />
            <QuestionSection />
        </main>
    )
}

export default Home
