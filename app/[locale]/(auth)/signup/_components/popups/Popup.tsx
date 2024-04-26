/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'

// import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

export function PopUp({ isOpen, range, country }: any) {
    const router = useRouter()
    const { t } = useTranslation()

    return (
        <Dialog open={isOpen && country !== '145'}>
            <DialogContent className="flex flex-col overflow-hidden   bg-white sm:max-w-[470px] ">
                <div className="relative h-40 w-full">
                    {/* <Image src={popupBack} layout="fill" objectFit="cover" /> */}
                </div>
                <div className="flex flex-col  gap-4 px-2 pb-2 text-center text-sm md:px-6 md:pb-4">
                    <span>
                        {range < 135
                            ? t('135-1')
                            : range > 135 && range < 270
                              ? t('270-1')
                              : range > 270 && range < 435
                                ? t('435-1')
                                : range > 435
                                  ? t('500-1')
                                  : null}
                    </span>
                    <span>
                        {range < 135
                            ? t('135-2')
                            : range > 135 && range < 270
                              ? t('270-2')
                              : range > 270 && range < 435
                                ? t('435-2')
                                : range > 435
                                  ? t('500-2')
                                  : null}
                    </span>
                    <span>
                        {range < 135
                            ? t('135-3')
                            : range > 135 && range < 270
                              ? t('270-3')
                              : range > 270 && range < 435
                                ? t('435-3')
                                : range > 435
                                  ? t('500-3')
                                  : null}
                        <br />
                        {range < 135 ? t('135-4') : range > 135 && range < 270 ? t('270-4') : null}
                    </span>
                    <span>
                        {range < 135 ? (
                            <>
                                {t('135-5')} (You can also search them on our website or in our{' '}
                                <a
                                    href="https://www.facebook.com/RoommateGeorgia.ge"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Facebook group
                                </a>
                                .)
                            </>
                        ) : range >= 135 && range < 270 ? (
                            <>
                                {t('270-5')} (You can also search them on our website or in our{' '}
                                <a
                                    href="https://www.facebook.com/RoommateGeorgia.ge"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Facebook group
                                </a>
                                .)
                            </>
                        ) : range >= 270 && range < 435 ? (
                            t('435-4') + '\u00A0'.repeat(5)
                        ) : range >= 435 ? (
                            t('500-4') + '\u00A0'.repeat(5)
                        ) : null}
                    </span>

                    <span>
                        {range < 135 ? t('135-6') : null}
                        {range > 135 && range < 270 ? <br /> : null}
                        {range > 270 && range < 435 ? t('435-5') + '\u00A0'.repeat(13) : null}
                        {range > 435 ? t('500-5') + '\u00A0'.repeat(13) : null}
                        <br />
                        {range > 270 && range < 435 ? t('435-6') + '\u00A0'.repeat(10) : null}
                        {range > 435 ? t('500-6') + '\u00A0'.repeat(10) : null}
                        <br />
                        {range > 270 && range < 435 ? t('435-7') : null}
                        {range > 435 ? t('500-7') : null}
                    </span>

                    <div className="mt-2 flex flex-row gap-2 ">
                        {range < 135 ? (
                            <Button onClick={() => router.push('/')}>{t('135-no')}</Button>
                        ) : range > 135 && range < 270 ? (
                            <Button onClick={() => router.push('/')}>{t('270-no')}</Button>
                        ) : null}
                        <Button onClick={() => router.push('/')}>
                            {range < 135
                                ? t('135-yes')
                                : range > 135 && range < 270
                                  ? t('270-yes')
                                  : range > 270 && range < 435
                                    ? t('435-yes')
                                    : range > 435
                                      ? t('435-yes')
                                      : null}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}