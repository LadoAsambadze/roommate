import Link from 'next/link'
import { FbIcon, InstagramIcon, LinkedinIcon, WhatsappIcon } from '../../svgs'

export const SocialIcons = () => {
    return (
        <>
            <div className="flex flex-row  gap-x-6">
                <Link target="_blank" href="https://www.facebook.com/RoommateGeorgia.ge">
                    <FbIcon className="h-8 w-8 cursor-pointer" />
                </Link>
                <Link
                    target="_blank"
                    href="https://www.instagram.com/roommate.ge?igsh=NHRseWl5MHgyaW1o&utm_source=qr"
                >
                    <InstagramIcon className="h-8 w-8 cursor-pointer" />
                </Link>
                <Link target="_blank" href="https://wa.me/%2B995599976385">
                    <WhatsappIcon className="h-8 w-8 cursor-pointer" />
                </Link>
                <Link target="_blank" href="https://www.linkedin.com/company/roommate-georgia/">
                    <LinkedinIcon className="h-8 w-8 cursor-pointer" />
                </Link>
            </div>
        </>
    )
}
