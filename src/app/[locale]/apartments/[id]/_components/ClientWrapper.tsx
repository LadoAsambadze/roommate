'use client'
import { GetPropertiesData, getPropertyById } from '@/graphql/query'
import { Language } from '@/graphql/typesGraphql'
import {
    Call,
    Checkbox,
    Heating,
    Location,
    Party,
    Person,
    Pet,
    PropertyBed,
    PropertyDoor,
    PropertyLedder,
    PropertySqm,
} from '@/src/components/svgs'

import { useQuery } from '@apollo/client'
import { Check, ChevronLeft, ChevronRight, X } from 'lucide-react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { useTranslation } from 'react-i18next'

export default function ClientWrapper() {
    const { t } = useTranslation()
    const params = useParams()
    const locale = params.locale
    const id = params.id as string
    const { data: dataById, error } = useQuery(getPropertyById, {
        variables: {
            lang: locale as Language,
            id: id,
        },
    })

    const { data: property, error: propertyErorr } = useQuery(GetPropertiesData, {
        variables: {
            lang: locale as Language,
            id: id,
        },
    })
    const [selectedIndex, setSelectedIndex] = useState(0)
    const images = dataById?.getProperty?.images || []

    const allAmenities = property?.getPropertyAmenities || []

    // Assuming dataById.getProperty.propertyAmenities is an array of included amenities
    const includedAmenities = dataById?.getProperty?.propertyAmenities || []

    // Create a Set of included amenity IDs for faster lookup
    const includedAmenityIds = new Set(includedAmenities.map((amenity) => amenity.id))

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

    const handleThumbClick = useCallback(
        (index: number) => {
            setSelectedIndex(index)
            emblaApi && emblaApi.scrollTo(index)
        },
        [emblaApi]
    )

    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return
        onSelect()
        emblaApi.on('select', onSelect)
        emblaApi.on('reInit', onSelect)
        return () => {
            emblaApi.off('select', onSelect)
            emblaApi.off('reInit', onSelect)
        }
    }, [emblaApi, onSelect])

     
    return (
        <main className="flex min-h-screen w-full flex-col gap-5 px-6 pb-10 pt-5 md:gap-10 lg:px-[280px]">
            <div className="relative w-full overflow-hidden rounded-md">
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex">
                        {images.map((item, index) => (
                            <div className="relative flex-[0_0_100%]" key={index}>
                                <div className="relative flex justify-center p-0">
                                    <div
                                        className="absolute inset-0 z-0 hidden md:block"
                                        style={{
                                            backgroundImage: `url(${item.thumb})`,
                                            backgroundSize: '150%',
                                            backgroundPosition: 'center',
                                            objectFit: 'fill',
                                            filter: 'blur(10px)',
                                        }}
                                    />
                                    <div className="relative z-10 w-full overflow-hidden md:w-auto">
                                        <div className="relative aspect-square h-[300px] w-full md:h-[500px] md:w-auto">
                                            <Image
                                                fill
                                                src={item.original}
                                                alt={`Image ${index}`}
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <button
                    className="absolute left-1 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-800 shadow-md md:left-4 md:block"
                    onClick={scrollPrev}
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-800 shadow-md md:right-4 md:block"
                    onClick={scrollNext}
                >
                    <ChevronRight size={24} />
                </button>
            </div>

            <div className=" -mt-8 hidden space-x-2 overflow-x-auto md:flex">
                {images.map((item, index) => (
                    <div
                        key={index}
                        className={`h-20 w-24 cursor-pointer overflow-x-auto rounded-md ${index === selectedIndex ? 'border-2 border-mainGreen' : ''}`}
                        onClick={() => handleThumbClick(index)}
                        onMouseEnter={() => handleThumbClick(index)}
                    >
                        <Image
                            src={item.thumb}
                            alt={`Thumbnail ${index}`}
                            width={160}
                            height={160}
                            className="h-full w-full object-cover"
                        />
                    </div>
                ))}
            </div>

            <div className="flex w-full flex-col gap-4 rounded-lg border border-[#E3E3E3] px-4 py-8 shadow-lg md:flex-col md:p-8">
                <div className="flex w-full flex-col items-start  gap-2 md:flex-row md:gap-40">
                    <div className="flex w-full flex-col gap-2 md:w-1/2 md:gap-4">
                        <span className="text-lg">
                            {dataById?.getProperty?.translations &&
                                dataById?.getProperty?.translations[0].title}
                        </span>
                        <span className="text-sm text-[#838CAC]">
                            {dataById?.getProperty?.propertyType?.translations[0].name}
                        </span>
                        <span className="md:text-base">{dataById?.getProperty?.price} $ </span>
                    </div>
                    <div className="flex w-full flex-col gap-2 md:w-auto md:gap-4">
                        <div className="flex flex-row  items-center  gap-2">
                            <Location className="h-4 w-4" />
                            <span className="text-base">{dataById?.getProperty?.street}</span>
                        </div>
                        <div className="flex w-full md:w-auto">
                            <div className="flex w-full cursor-pointer  items-center gap-2 rounded-md bg-mainGreen px-4 py-2  text-white  md:w-auto">
                                <a
                                    href={`tel:${dataById?.getProperty?.contactPhone}`}
                                    className="flex items-center gap-2"
                                >
                                    <Call className="h-5 w-5 fill-white" />
                                    <span className=" text-sm md:text-base">
                                        {dataById?.getProperty?.contactPhone}
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-[1px] w-full bg-[#E3E3E3]"></div>
                <div className="flex w-auto flex-col gap-2">
                    <span>
                        {t('avaiableForRent')}: &nbsp;
                        {new Date(dataById?.getProperty?.availableFrom).toLocaleDateString(
                            'en-GB',
                            {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                            }
                        )}
                    </span>
                    <span>
                        {t('minRentPeriond')}: {dataById?.getProperty?.minRentalPeriod}
                    </span>
                    {!dataById?.getProperty?.withDeposit ? (
                        <div className="w-auto bg-[#CFF1E6] p-2">{t('withoutDeposit')}</div>
                    ) : (
                        <div className="bg-[#CFF1E]">
                            {t('depositAmount')}: {dataById?.getProperty?.propertyDeposit?.amount} $
                        </div>
                    )}
                </div>
            </div>

            <div className="grid h-auto  w-full grid-cols-1 gap-4 rounded-lg border border-[#E3E3E3] p-4 shadow-lg md:grid-cols-3 md:gap-y-8  md:p-8">
                <div className="flex flex-row items-center gap-2 md:gap-3">
                    <PropertySqm className="h-5 w-5" />
                    <span className="md:text-sm">
                        {t('area')}: {dataById?.getProperty?.area}
                    </span>
                </div>
                <div className="flex flex-row items-center gap-2 md:gap-3">
                    <PropertyDoor className="h-5 w-5" />
                    <span className="md:text-sm">
                        {t('rooms')}: {dataById?.getProperty?.rooms}
                    </span>
                </div>
                <div className="flex flex-row items-center gap-2 md:gap-3">
                    <PropertyBed className="h-5 w-5" />
                    <span className="md:text-sm">
                        {t('bedroom')}: {dataById?.getProperty?.bedrooms}
                    </span>
                </div>
                <div className="flex flex-row items-center gap-2 md:gap-3">
                    <PropertyDoor className="h-5 w-5" />
                    <span className="md:text-sm">
                        {t('capacity')}: {dataById?.getProperty?.bedrooms}
                    </span>
                </div>
                <div className="flex flex-row items-center gap-2 md:gap-3">
                    <PropertyLedder className="h-5 w-5" />
                    <span className="md:text-sm">
                        {t('floors')}: {dataById?.getProperty?.totalFloors}/
                        {dataById?.getProperty?.floor}
                    </span>
                </div>
                <div className="flex flex-row items-center gap-1 md:gap-3">
                    <Pet className="h-5 w-5" />
                    <span className="md:text-sm">{t('petAllowed')}:</span>
                    {dataById?.getProperty?.petAllowed ? (
                        <Checkbox className="h-4 w-4 md:h-5 md:w-5" checked={true} readOnly />
                    ) : (
                        <X className="h-4 w-4 text-red-500 md:h-5 md:w-5" />
                    )}
                </div>
                <div className="flex flex-row items-center gap-1 md:gap-3">
                    <Party className="h-5 w-5" />
                    <span className="md:text-sm">{t('partyAllowed')}:</span>
                    {dataById?.getProperty?.partyAllowed ? (
                        <Checkbox className="h-4 w-4 md:h-5 md:w-5" checked={true} readOnly />
                    ) : (
                        <X className="h-4 w-4 text-red-500 md:h-5 md:w-5" />
                    )}
                </div>
                <div className="flex flex-row items-center gap-2 md:gap-3">
                    <Heating className="h-5 w-5" />

                    {dataById?.getProperty?.housingHeatingTypes?.[0]?.translations?.[0]?.name ||
                        'N/A'}
                </div>
                <div className="flex flex-row items-center gap-2 md:gap-3">
                    <Person className="h-6 w-6" />
                    <span className="md:text-sm">{t('capacity')}:</span>
                    {dataById?.getProperty?.capacity}
                </div>
            </div>
            <div className="flex h-auto w-full flex-col gap-2 rounded-lg border border-[#E3E3E3] p-4 shadow-lg md:gap-4 md:p-8 ">
                <h2 className="text-base md:text-lg">{t('description')}</h2>
                <p className="text-sm">
                    {dataById?.getProperty?.translations &&
                        dataById?.getProperty?.translations[0].description}
                </p>
            </div>
            <div className="flex h-auto w-full flex-col gap-2 rounded-lg border  border-[#E3E3E3] p-4 shadow-lg md:gap-6 md:p-8 ">
                <h2 className="text-base md:text-lg">{t('amenities')}</h2>
                <div className="grid-cols-1 gap-y-3 md:grid md:grid-flow-row md:auto-rows-auto md:grid-cols-3  md:grid-rows-[repeat(auto-fill,minmax(0,1fr))]">
                    {allAmenities.map((item, index) => (
                        <div
                            className="mb-2 flex w-full flex-row items-center gap-2 md:mb-0"
                            key={index}
                        >
                            {includedAmenityIds.has(item.id) ? (
                                <Checkbox
                                    className="h-4 w-4 md:h-5 md:w-5"
                                    checked={true}
                                    readOnly
                                />
                            ) : (
                                <X className="h-4 w-4 text-red-500 md:h-5 md:w-5" />
                            )}
                            <span className="md:text-sm">{item.translations[0].name}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex w-full flex-col gap-4 overflow-hidden rounded-lg border  border-[#E3E3E3] pb-8 shadow-lg md:pb-8">
                <div className="w-full bg-mainGreen px-8  py-3 text-white">
                    {t('livingSafety')}{' '}
                </div>
                {dataById?.getProperty?.housingLivingSafeties?.map((item, index) => (
                    <div
                        className="flex w-full flex-row items-center gap-2 px-4 md:px-8"
                        key={index}
                    >
                        <Check className="min-h-6 min-w-6 text-mainGreen" />
                        <span>{item.translations[0].name}</span>
                    </div>
                ))}
            </div>
        </main>
    )
}
