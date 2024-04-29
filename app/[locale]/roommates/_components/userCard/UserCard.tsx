import Image from 'next/image'
import Temporary from '../../../../../public/images/Temporary.jpg'
import Avatar from '../../../../../public/images/MaleAvatar.jpg'
import { Heart, Location, Sms } from '@/components/svgs'

export default function UserCard() {
    return (
        <>
            <section className="flex min-h-screen w-full flex-col gap-6 px-6 sm:px-32 md:w-auto md:px-24  lg:px-0">
            <div className="flex h-auto  w-full flex-col gap-6  overflow-hidden rounded-lg bg-[#FFFFFF]  shadow-md  lg:h-[232px] lg:w-full lg:flex-row lg:p-4 ">
                    <Image
                        src={Avatar}
                        className="h-[200px] w-full rounded-lg  object-cover lg:h-full  lg:w-[332px]"
                        alt="test"
                    />
                    <div className="flex h-full w-full flex-col gap-4 p-4 pb-3 pt-4 lg:p-0">
                        <div className="flex w-full flex-row  items-start justify-between">
                            <div className="flex flex-col gap-1 md:flex-row">
                                <span className="text-base font-semibold md:text-sm">
                                    მაკო - 32 წლის
                                </span>
                                <span className="text-sm text-[#838CAC]">16.04.2022</span>
                            </div>
                            <button className="flex flex-row items-center rounded-md bg-[#0A7CFF] px-3 py-2">
                                <Sms className="h-4 w-4" />
                                <span className="ml-2 text-sm text-white">message</span>
                            </button>
                        </div>
                        <div className="hidden h-[1px] w-full bg-[#E3E3E3] md:block"></div>
                        <span className="text-sm">
                            შემთხვევითად გენერირებული ტექსტი ეხმარება დიზაინერებს და ტიპოგრაფიული
                            ნაწარმის
                        </span>
                        <div className="flex w-full flex-row  items-center justify-between">
                            <div className="flex flex-col gap-2 md:flex-row">
                                <span className="text-sm text-[#838CAC]">ბიუჯეტი</span>
                                <span className="text-sm">500$ / თვეში</span>
                            </div>
                            <div className="flex flex-col gap-2 md:flex-row">
                                <span className="text-sm text-[#838CAC]">ხელმისაწვდომია</span>
                                <span className="text-sm">2 აპრილი 2024</span>
                            </div>
                        </div>
                        <div className="h-[1px] w-full bg-[#E3E3E3]"></div>
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


                <div className="flex h-auto  w-full flex-col gap-6  overflow-hidden rounded-lg bg-[#FFFFFF]  shadow-md  lg:h-[232px] lg:w-full lg:flex-row lg:p-4 ">
                    <Image
                        src={Temporary}
                        className="h-[200px] w-full rounded-lg  object-cover lg:h-full  lg:w-[332px]"
                        alt="test"
                    />
                    <div className="flex h-full w-full flex-col gap-4 p-4 pb-3 pt-4 lg:p-0">
                        <div className="flex w-full flex-row  items-start justify-between">
                            <div className="flex flex-col gap-1 md:flex-row">
                                <span className="text-base font-semibold md:text-sm">
                                    მაკო - 32 წლის
                                </span>
                                <span className="text-sm text-[#838CAC]">16.04.2022</span>
                            </div>
                            <button className="flex flex-row items-center rounded-md bg-[#0A7CFF] px-3 py-2">
                                <Sms className="h-4 w-4" />
                                <span className="ml-2 text-sm text-white">message</span>
                            </button>
                        </div>
                        <div className="hidden h-[1px] w-full bg-[#E3E3E3] md:block"></div>
                        <span className="text-sm">
                            შემთხვევითად გენერირებული ტექსტი ეხმარება დიზაინერებს და ტიპოგრაფიული
                            ნაწარმის
                        </span>
                        <div className="flex w-full flex-row  items-center justify-between">
                            <div className="flex flex-col gap-2 md:flex-row">
                                <span className="text-sm text-[#838CAC]">ბიუჯეტი</span>
                                <span className="text-sm">500$ / თვეში</span>
                            </div>
                            <div className="flex flex-col gap-2 md:flex-row">
                                <span className="text-sm text-[#838CAC]">ხელმისაწვდომია</span>
                                <span className="text-sm">2 აპრილი 2024</span>
                            </div>
                        </div>
                        <div className="h-[1px] w-full bg-[#E3E3E3]"></div>
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

            </section>
        </>
    )
}
