import { Hand, ProfileContractIcon, ProfileRentIcon } from '@/src/components/svgs'
import { Button } from '@/src/components/ui/button'

export default function page() {
    return (
        <main className="flex min-h-screen w-full flex-col items-center gap-6 py-4">
            <div className="flex w-full flex-row gap-6 px-6">
                <h1 className="text-lg font-medium">გამარჯობა ნიკა</h1>
                <Hand className="h-8 w-8" />
            </div>
            <div className="flex flex-col items-center px-6">
                <div className="flex w-full flex-col items-center  gap-4">
                    <ProfileRentIcon className="h-24 w-40" />
                    <span className="text-center  text-sm font-medium">გაქირავება</span>
                    <span className="text-center  text-sm font-medium">
                        ბინის გაქირავება გსურს? ატვირთე ბინა და მოძბნე პოტენციური მდგმური
                    </span>
                    <Button className="w-auto bg-[#F59E0B]">ატვირთე ბინა</Button>
                </div>
            </div>
            <div className="flex flex-col items-center px-6">
                <div className="flex w-full flex-col items-center  gap-4">
                    <ProfileContractIcon className="h-24 w-40" />
                    <span className="text-center  text-sm font-medium">გაქირავება</span>
                    <span className="text-center  text-sm font-medium">
                        ბინის გაქირავება გსურს? ატვირთე ბინა და მოძბნე პოტენციური მდგმური
                    </span>
                    <Button className="w-auto bg-[#F59E0B]">ატვირთე ბინა</Button>
                </div>
            </div>
        </main>
    )
}
