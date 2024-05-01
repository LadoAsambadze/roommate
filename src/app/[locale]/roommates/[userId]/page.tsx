import Temporary from '../../../../../public/images/Temporary.jpg'
import Image from 'next/image'
import {
    Calendar,
    Heart,
    Like,
    Location,
    Pets,
    RateStars,
    Sms,
    Success,
    Verified,
    Wallet,
} from '@/src/components/svgs'
import { auth } from '@/src/libs/next-auth/auth'
import { redirect } from 'next/navigation'
import initTranslations from '@/src/libs/i18next/i18n'
import TranslationsProvider from '@/src/libs/i18next/TranslationsProvider'

const i18nNamespaces = ['home']
export default async function UserId({ params: { locale } }: { params: { locale: string } }) {
    const session = await auth()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t, resources } = await initTranslations(locale, i18nNamespaces)

    if (!session) {
        return redirect('/signin')
    }
    return (
        <TranslationsProvider namespaces={i18nNamespaces} locale={locale} resources={resources}>
            <main className="m flex min-h-screen w-full flex-col bg-[#F5F5F5] md:gap-6 md:px-20 md:pb-24  md:pt-8 xl:px-[320px]">
                <section className="flex  h-full w-full flex-col  md:h-[280px] md:flex-row  md:gap-3 lg:gap-6 ">
                    <div className="  h-[300px] w-full overflow-hidden md:h-full  md:rounded-lg md:shadow-md ">
                        <Image src={Temporary} className="h-full w-full  object-cover " alt="123" />
                    </div>
                    <div className="z-50 -mt-4 flex h-auto w-full flex-col overflow-hidden rounded-t-3xl bg-[#FFFFFF]   px-6  pt-6  md:mt-0 md:rounded-xl md:border md:border-[#E3E3E3] md:p-6  md:shadow-sm ">
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
                        <div className="mb-1 mt-4  flex w-full flex-row items-center justify-between">
                            <span className=" text-sm text-[#838CAC] md:mt-4">ჩემს შესახებ</span>
                            <button className="flex flex-row items-center rounded-md bg-[#0A7CFF] px-3 py-2">
                                <Sms className="h-4 w-4" />
                                <span className="ml-2 text-sm text-white">message</span>
                            </button>
                        </div>
                        <p className="mt-2 text-sm">
                            შემთხვევითად გენერირებული ტექსტი ეხმარება დიზაინერებს და ტიპოგრაფიული
                            ნაწარმის, შემთხვევითად გენერირებული ტექსტი ეხმარება დიზაინერებს და
                            ტიპოგრაფიული ნაწარმის.
                        </p>
                        <div className="mt-5 h-[1px] w-full bg-[#A0A0A0] md:hidden"></div>
                    </div>
                </section>

                <section className=" flex h-full w-full  flex-col gap-6 bg-[#FFFFFF] px-6 pt-4 md:flex-row md:justify-start md:gap-8 md:rounded-xl md:border-2 md:border-[#E3E3E3] md:p-6 md:shadow-sm ">
                    <div className="flex w-auto flex-row items-start">
                        <Wallet className="h-6 w-6" />
                        <div className="ml-4 flex flex-col">
                            <span className="mb-2 text-sm text-[#838CAC]">ბიუჯეტი</span>
                            <span className="text-sm">500$ / თვეში</span>
                        </div>
                    </div>
                    <div className="flex w-auto flex-row items-start">
                        <Calendar className="h-6 w-6" />
                        <div className="ml-4 flex flex-col">
                            <span className="mb-2 text-sm text-[#838CAC]">ხელმისაწვდომია</span>
                            <span className="text-sm">2 აპრილი 2024</span>
                        </div>
                    </div>
                    <div className="flex w-auto flex-row items-start">
                        <Location className="h-6 w-6" />
                        <div className="ml-4 flex flex-col">
                            <span className="mb-2 text-sm text-[#838CAC]">ადგილმდებარეობა</span>
                            <span className="text-sm">გოთუას #2</span>
                        </div>
                    </div>
                    <div className=" h-[1px] w-full bg-[#A0A0A0] md:hidden"></div>
                </section>
                <section className=" flex h-full w-full flex-col gap-8 bg-[#FFFFFF] px-6 pt-4 md:flex-row md:justify-start md:gap-8 md:rounded-xl md:border-2 md:border-[#E3E3E3] md:p-6 md:shadow-sm ">
                    <div className="flex w-auto flex-row items-start">
                        <Pets className="h-6 w-6" />
                        <div className="ml-4 flex flex-col">
                            <span className="mb-2 text-sm text-[#838CAC]">შინაური ცხოველები</span>
                            <span className="text-sm">5 თხა</span>
                        </div>
                    </div>
                    <div className="flex w-auto flex-row items-start">
                        <Like className="h-6 w-6" />
                        <div className="ml-4 flex flex-col">
                            <span className="mb-2 text-sm text-[#838CAC]">ინტერესები</span>
                            <span className="text-sm">ხატვა, ცეკვა</span>
                        </div>
                    </div>
                </section>
                <section className="h-full w-full  overflow-hidden rounded-md bg-[#FFFFFF] px-6 pb-6 pt-12 md:p-0">
                    <div className="h-full w-full  shadow-sm">
                        <div className="flex h-auto w-full items-center gap-2 border-[#52A630] bg-[#52A630] px-4 py-2 ">
                            <Verified />
                            <span className=" text-sm text-white">ვერიფიცირებული მომხმარებელი</span>
                        </div>
                        <div className="flex h-full w-full flex-col gap-6 border-x-2 border-b-2 border-[#E3E3E3] p-6  md:flex-row">
                            <div className="flex h-auto w-auto flex-col">
                                <span className="text-[#838CAC]">ID ვერიფიკაცია</span>
                                <div className="flex w-full flex-row items-center gap-2 ">
                                    <Success />
                                    <span>სახელი</span>
                                </div>
                                <div className="flex w-full flex-row items-center gap-2 ">
                                    <Success />
                                    <span>გვარი</span>
                                </div>
                            </div>
                            <div className="flex h-auto w-auto flex-col">
                                <span className="text-[#838CAC]">კონტაქტის ვერიფიკაცია</span>
                                <div className="flex w-full flex-row items-center gap-2 ">
                                    <Success />
                                    <span>მამის სახელი</span>
                                </div>
                                <div className="flex w-full flex-row items-center gap-2 ">
                                    <Success />
                                    <span>სტატუსი</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex h-full w-full flex-col gap-6 overflow-hidden rounded-b-md border-x-2 border-b-2 border-[#E3E3E3] px-6  py-4">
                            <span className="text-xs text-[#838CAC]">
                                შემთხვევითად გენერირებული ტექსტი დიზაინერებს და ტიპოგრაფიული
                                ნაწარმის
                            </span>
                        </div>
                    </div>
                </section>
            </main>
        </TranslationsProvider>
    )
}
