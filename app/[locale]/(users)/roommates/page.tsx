import Image from 'next/image'
import Temporary from '../../../../public/images/Temporary.jpg'
import { Button } from '@/components/ui/button'
import Avatar from '../../../../public/images/MaleAvatar.jpg'

export default function Roommates() {
    return (
        <main className="flex min-h-screen w-full flex-col px-6 py-4">
            <div className="w-full  bg-[#FFFFFF] ">
                <Image
                    src={Avatar}
                    className="h-[200px] w-full rounded-lg  object-cover"
                    alt="test"
                />
                <div className="flex h-auto w-full flex-col gap-4 pb-3 pt-4">
                    <div className="flex w-full flex-row  items-center justify-between">
                        <div className="flex flex-col gap-2">
                            <span>მაკო - 32 წლის</span>
                            <span>16.04.2022</span>
                        </div>
                        <Button>Message</Button>
                    </div>
                    <span>
                        შემთხვევითად გენერირებული ტექსტი ეხმარება დიზაინერებს და ტიპოგრაფიული
                        ნაწარმის
                    </span>
                </div>
            </div>
            <div className="w-full  bg-[#FFFFFF]">
                <Image
                    src={Temporary}
                    className="h-[200px] w-full rounded-lg  object-cover"
                    alt="test"
                />
                <div className="flex h-auto w-full flex-col pb-3 pt-4">
                    <div className="flex w-full flex-row  items-center justify-between">
                        <div className="flex flex-col gap-2">
                            <span>მაკო - 32 წლის</span>
                            <span>16.04.2022</span>
                        </div>
                        <Button>Message</Button>
                    </div>
                </div>
            </div>
        </main>
    )
}
