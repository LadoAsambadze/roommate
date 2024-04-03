'use client'

import { LangChooseProps } from '@/types/types'
import { useParams, useRouter } from 'next/navigation'

const LangChoose = ({ className, spanClassname }: LangChooseProps) => {
    const params = useParams()
    const router = useRouter()
    const currentLocale = params.locale || 'ka'
    const newLocale = currentLocale === 'ka' ? 'en' : 'ka'

    const handleLangSwitch = () => {
        const newLocale = currentLocale === 'ka' ? 'en' : 'ka'
        router.replace(newLocale)
    }

    return (
        <>
            <div className={`${className}`} onClick={handleLangSwitch}>
                <span className={`${spanClassname}`}>{newLocale === 'ka' ? 'GEO' : 'ENG'}</span>
            </div>
        </>
    )
}

export default LangChoose
