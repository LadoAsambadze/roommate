import Image from 'next/image'
import Temporary from '../../../../../public/images/Temporary.jpg'
import { Button } from '@/components/ui/button'
import Avatar from '../../../../../public/images/MaleAvatar.jpg'
import { Heart, Location } from '@/components/svgs'

export default function UserCard() {
    return (
        <>
            <div className="w-full  bg-[#FFFFFF] ">
                <Image
                    src={Avatar}
                    className="h-[200px] w-full rounded-lg  object-cover"
                    alt="test"
                />
                <div className="flex h-auto w-full flex-col gap-4 pb-3 pt-4">
                    <div className="flex w-full flex-row  items-start justify-between">
                        <div className="flex flex-col gap-1">
                            <span className="text-base font-semibold">მაკო - 32 წლის</span>
                            <span className="text-sm text-[#838CAC]">16.04.2022</span>
                        </div>
                        <Button>Message</Button>
                    </div>
                    <span className="text-sm">
                        შემთხვევითად გენერირებული ტექსტი ეხმარება დიზაინერებს და ტიპოგრაფიული
                        ნაწარმის
                    </span>
                    <div className="flex w-full flex-row  items-center justify-between">
                        <div className="flex flex-col gap-2">
                            <span className="text-sm text-[#838CAC]">ბიუჯეტი</span>
                            <span className="text-sm">500$ / თვეში</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-sm text-[#838CAC]">ხელმისაწვდომია</span>
                            <span className="text-sm">2 აპრილი 2024</span>
                        </div>
                    </div>
                    <div className="h-[1px] w-full bg-[#EEEEEE]"></div>
                    <div className="flex w-full  flex-row items-center justify-between">
                        <div className="flex flex-row items-center gap-3 ">
                            <Location />
                            <span className="text-sm">გოთუას 4</span>
                        </div>
                        <div className="mr-8 flex flex-row items-center gap-3 ">
                            <Heart />
                            <span className="text-sm">შენახვა</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full  bg-[#FFFFFF] ">
                <Image
                    src={Temporary}
                    className="h-[200px] w-full rounded-lg  object-cover"
                    alt="test"
                />
                <div className="flex h-auto w-full flex-col gap-4 pb-3 pt-4">
                    <div className="flex w-full flex-row  items-start justify-between">
                        <div className="flex flex-col gap-1">
                            <span className="text-base font-semibold">მაკო - 32 წლის</span>
                            <span className="text-sm text-[#838CAC]">16.04.2022</span>
                        </div>
                        <Button>Message</Button>
                    </div>
                    <span className="text-sm">
                        შემთხვევითად გენერირებული ტექსტი ეხმარება დიზაინერებს და ტიპოგრაფიული
                        ნაწარმის
                    </span>
                    <div className="flex w-full flex-row  items-center justify-between">
                        <div className="flex flex-col gap-2">
                            <span className="text-sm text-[#838CAC]">ბიუჯეტი</span>
                            <span className="text-sm">500$ / თვეში</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-sm text-[#838CAC]">ხელმისაწვდომია</span>
                            <span className="text-sm">2 აპრილი 2024</span>
                        </div>
                    </div>
                    <div className="h-[1px] w-full bg-[#EEEEEE]"></div>
                    <div className="flex w-full flex-row  items-center justify-between">
                        <div className="flex flex-row items-center gap-3">
                            <Location />
                            <span className="text-sm">გოთუას 4</span>
                        </div>
                        <div className="mr-8 flex flex-row items-center gap-3">
                            <Heart />
                            <span className="text-sm">შენახვა</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
