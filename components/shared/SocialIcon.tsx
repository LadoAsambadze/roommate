import { FbIcon, InstagramIcon, LinkedinIcon, WhatsappIcon } from '../svgs'

export const SocialIcons = () => {
    return (
        <>
            <div className="flex flex-row  gap-x-6">
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.facebook.com/RoommateGeorgia.ge"
                >
                    <FbIcon className="cursor-pointer" />
                </a>
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.instagram.com/roommate.ge?igsh=NHRseWl5MHgyaW1o&utm_source=qr"
                >
                    <InstagramIcon className="cursor-pointer" />
                </a>
                <a target="_blank" rel="noopener noreferrer" href="https://wa.me/%2B995599976385">
                    <WhatsappIcon className="cursor-pointer" />
                </a>
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.linkedin.com/company/roommate-georgia/"
                >
                    <LinkedinIcon className="cursor-pointer" />
                </a>
            </div>
        </>
    )
}
