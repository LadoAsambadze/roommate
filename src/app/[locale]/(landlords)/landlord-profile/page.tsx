import {
    Audio,
    Blank,
    Hand,
    House,
    Lamp,
    ProfileContractIcon,
    ProfileRentIcon,
} from '@/src/components/svgs'
import { Button } from '@/src/components/ui/button'

export default function page() {
    return (
        <main className="flex min-h-screen w-full flex-col items-center gap-6 px-6 py-4 md:gap-10 lg:px-[300px]">
            <div className="flex w-full flex-row gap-6 px-6">
                <h1 className="text-lg font-medium">გამარჯობა ნიკა</h1>
                <Hand className="h-8 w-8" />
            </div>
            <div className="flex flex-col gap-6 md:flex-row">
                <div className="flex flex-col items-center px-6">
                    <div className="flex w-full flex-col items-center  gap-4">
                        <ProfileRentIcon className="h-24 w-40" />
                        <span className="text-center  text-base font-medium">გაქირავება</span>
                        <span className="text-center  text-sm font-medium">
                            ბინის გაქირავება გსურს? ატვირთე ბინა და მოძბნე პოტენციური მდგმური
                        </span>
                        <Button className="w-auto bg-[#F59E0B]">ატვირთე ბინა</Button>
                    </div>
                </div>
                <div className="flex flex-col items-center px-6">
                    <div className="flex w-full flex-col items-center  gap-4">
                        <ProfileContractIcon className="h-24 w-40" />
                        <span className="text-center  text-base font-medium">გაქირავება</span>
                        <span className="text-center  text-sm font-medium">
                            ბინის გაქირავება გსურს? ატვირთე ბინა და მოძბნე პოტენციური მდგმური
                        </span>
                        <Button className="w-auto bg-[#F59E0B]">ატვირთე ბინა</Button>
                    </div>
                </div>
            </div>
            <div className="h-[1px] w-full bg-[#E3E3E3]"></div>
            <div className="flex w-full flex-col gap-4 md:items-start">
                <h1>შენს მიერ ატვირთული განცხადებები</h1>
                <div className="flex flex-row gap-4">
                    <div className="flex items-center justify-center gap-2 rounded-md border border-[#838CAC] p-2 text-[#838CAC] md:w-52">
                        <House className="h-6 w-6" />
                        <span className="text-xs">ჩემი განცხადებები</span>
                    </div>
                    <div className="flex items-center  justify-center  gap-2 rounded-md border border-[#838CAC] p-3 text-[#838CAC] md:w-52">
                        <Blank className="h-5 w-5" /> <span className="text-xs">კონტრაქტები</span>
                    </div>
                </div>
            </div>
            <div className="h-[1px] w-full bg-[#E3E3E3]"></div>
            <div className="flex w-full flex-col gap-8">
                <h1>დაგვიკავშირდით</h1>
                <div className="flex w-full flex-row items-center gap-2 ">
                    <Lamp className="h-10 w-32" />
                    <div className="flex flex-col gap-3">
                        <h1 className="text-sm font-semibold">გაიგე მეტი ჩვენი სერვისის შესახებ</h1>
                        <span className="text-xs leading-5">
                            შემთხვევითად გენერირებული ტექსტი ეხმარება დიზაინერებს და ტიპოგრაფიული
                            ნაწარმის, შემთხვევითად გენერირებული
                        </span>
                    </div>
                </div>
                <div className="flex flex-row items-center gap-2">
                    <Audio className="h-10 w-32" />
                    <div className="flex flex-col gap-3">
                        <h1 className="text-sm font-semibold">სრული მხარდაჭერა</h1>
                        <span className="text-xs leading-5">
                            შემთხვევითად გენერირებული ტექსტი ეხმარება დიზაინერებს და ტიპოგრაფიული
                            ნაწარმის, შემთხვევითად გენერირებული
                        </span>
                    </div>
                </div>
            </div>
        </main>
    )
}
