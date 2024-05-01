import BlogSection from '../../components/home/BlogSection'
import ConnectSection from '../../components/home/ConnectSection'
import ContactSection from '../../components/home/ContactSection'
import FeatureSection from '../../components/home/FeatureSection'
import QuestionSection from '../../components/home/QuestionSection'
import ReviewSection from '../../components/home/ReviewSection'
import SuggestSection from '../../components/home/SuggestSection'

async function Home() {
    return (
        <main className="h-full w-full">
            <FeatureSection />
            <BlogSection />
            <SuggestSection />
            <ConnectSection />
            <ContactSection />
            <ReviewSection />
            <QuestionSection />
        </main>
    )
}

export default Home
