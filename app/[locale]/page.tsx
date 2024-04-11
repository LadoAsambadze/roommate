// import { getClient } from '@/libs/client'
import BlogSection from './_components/BlogSection'
import ConnectSection from './_components/ConnectSection'
import ContactSection from './_components/ContactSection'
import FeatureSection from './_components/FeatureSection'
import QuestionSection from './_components/QuestionSection'
import ReviewSection from './_components/ReviewSection'
import SuggestSection from './_components/SuggestSection'
// import { gql } from '@apollo/client'
// import ApartmentSection from './_components/ApartmentSection'

// const query = gql`
//     query ExampleQuery($locale: Language) {
//         getDistricts(locale: $locale) {
//             id
//             visible
//             translations {
//                 id
//                 name
//                 lang
//             }
//         }
//     }
// `

async function Home() {
    // const client = getClient()
    // const { data } = await client.query({ query })
    // console.log(data)

    return (
        <main>
            <FeatureSection />
            <BlogSection />
            <SuggestSection />
            <ConnectSection />
            <ContactSection />
            <ReviewSection />
            <QuestionSection />
            {/* <ApartmentSection flats={data?.data} /> */}
        </main>
    )
}

export default Home
