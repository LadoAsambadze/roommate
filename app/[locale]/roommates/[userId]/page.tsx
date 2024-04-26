import Temporary from '../../../../public/images/Temporary.jpg'

import Image from 'next/image'
import { Heart, RateStars, Wallet } from '@/components/svgs'

export default async function UserId() {
    return (
        <main className="m flex min-h-screen w-full flex-col bg-[#F5F5F5] md:gap-6 md:px-[308px]  md:pb-[200px] md:pt-8">
            <section className="flex h-full w-full flex-col md:flex-row  md:gap-6">
                <div className="h-[300px] w-full overflow-hidden md:h-[388px]  md:rounded-lg md:shadow-md">
                    <Image
                        src={Temporary}
                        className="h-full w-full  object-cover "
                        alt="123"
                    />
                </div>
                <div className="z-50 -mt-4 flex h-auto w-full flex-col overflow-hidden rounded-t-3xl bg-[#FFFFFF]   px-6  pt-6  md:mt-0 md:rounded-xl md:border-2 md:border-[#E3E3E3] md:p-6  md:shadow-sm ">
                    <div className="flex w-full flex-row  items-start justify-between">
                        <div className="flex flex-col gap-[6px] md:flex-row">
                            <span className="text-base font-semibold md:text-sm">
                                მაკო - 32 წლის
                            </span>
                            <span className="text-sm text-[#838CAC]">16.04.2022</span>
                        </div>
                        <Heart className="h-6 w-6 cursor-pointer" />
                    </div>
                    <RateStars className="mt-[6px] h-5 w-32 " />
                    <div className="mt-5 h-[1px] w-full bg-[#A0A0A0]"></div>
                    <span className="mt-4 text-sm text-[#838CAC]">ჩემს შესახებ</span>
                    <p className="mt-2 text-sm">
                        შემთხვევითად გენერირებული ტექსტი ეხმარება დიზაინერებს და ტიპოგრაფიული
                        ნაწარმის, შემთხვევითად გენერირებული ტექსტი ეხმარება დიზაინერებს და
                        ტიპოგრაფიული ნაწარმის.
                    </p>
                    <div className="mt-5 h-[1px] w-full bg-[#A0A0A0]"></div>
                </div>
            </section>

            <section className=" flex h-full w-full flex-col gap-6 bg-[#FFFFFF] px-6 pt-4 md:flex-row md:justify-start md:gap-8 md:rounded-xl md:border-2 md:border-[#E3E3E3] md:p-6 md:shadow-sm ">
                <div className="flex w-auto flex-row items-start">
                    <Wallet className="h-6 w-6" />
                    <div className="ml-4 flex flex-col">
                        <span className="mb-2 text-sm text-[#838CAC]">ბიუჯეტი</span>
                        <span className="text-sm">500$ / თვეში</span>
                    </div>
                </div>
                <div className="flex w-auto flex-row items-start">
                    <Wallet className="h-6 w-6" />
                    <div className="ml-4 flex flex-col">
                        <span className="mb-2 text-sm text-[#838CAC]">ბიუჯეტი</span>
                        <span className="text-sm">500$ / თვეში</span>
                    </div>
                </div>
                <div className="flex w-auto flex-row items-start">
                    <Wallet className="h-6 w-6" />
                    <div className="ml-4 flex flex-col">
                        <span className="mb-2 text-sm text-[#838CAC]">ბიუჯეტი</span>
                        <span className="text-sm">500$ / თვეში</span>
                    </div>
                </div>
                <div className=" h-[1px] w-full bg-[#A0A0A0] md:hidden"></div>
            </section>
            <section className=" flex h-full w-full flex-col gap-8 bg-[#FFFFFF] px-6 pt-4 md:flex-row md:justify-start md:gap-8 md:rounded-xl md:border-2 md:border-[#E3E3E3] md:p-6 md:shadow-sm ">
                <div className="flex w-auto flex-row items-start">
                    <Wallet className="h-6 w-6" />
                    <div className="ml-4 flex flex-col">
                        <span className="mb-2 text-sm text-[#838CAC]">ბიუჯეტი</span>
                        <span className="text-sm">500$ / თვეში</span>
                    </div>
                </div>
                <div className="flex w-auto flex-row items-start">
                    <Wallet className="h-6 w-6" />
                    <div className="ml-4 flex flex-col">
                        <span className="mb-2 text-sm text-[#838CAC]">ბიუჯეტი</span>
                        <span className="text-sm">500$ / თვეში</span>
                    </div>
                </div>
            </section>
            <section className="h-full w-full  bg-[#FFFFFF] px-6 pb-6 pt-12 md:p-0 ">
                <div className="h-full w-full overflow-hidden rounded-md  shadow-sm">
                    <div className="h-auto w-full border-[#52A630] bg-[#52A630] px-4 py-2 ">
                        <span>Icon</span>
                        <span className=" text-sm text-white">ვერიფიცირებული მომხმარებელი</span>
                    </div>
                    <div className="flex h-full w-full flex-col gap-6 border-x-2 border-b-2 border-[#E3E3E3] p-6  md:flex-row">
                        <div className="flex h-auto w-auto flex-col">
                            <span className="text-[#838CAC]">Id verified</span>
                            <div className="w-full ">
                                <span>icon</span>
                                <span className="ml-2">icon</span>
                            </div>
                            <div className="w-full ">
                                <span>icon</span>
                                <span className="ml-2">icon</span>
                            </div>
                        </div>
                        <div className="flex h-auto w-auto flex-col">
                            <span className="text-[#838CAC]">Id verified</span>
                            <div className="w-full ">
                                <span>icon</span>
                                <span className="ml-2">icon</span>
                            </div>
                            <div className="w-full ">
                                <span>icon</span>
                                <span className="ml-2">icon</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex h-full w-full flex-col gap-6 overflow-hidden border-x-2 border-b-2 border-[#E3E3E3] px-6  py-4">
                        <span className="text-xs text-[#838CAC]">
                            შემთხვევითად გენერირებული ტექსტი დიზაინერებს და ტიპოგრაფიული ნაწარმის
                        </span>
                    </div>
                </div>
            </section>
            <section>Carousel</section>
        </main>
    )
}
