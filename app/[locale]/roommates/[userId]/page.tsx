import Temporary from '../../../../public/images/Temporary.jpg'

import Image from 'next/image'

export default async function UserId() {
    return (
        <main className="flex min-h-screen w-full flex-col ">
            <div className="h-[300px] w-full">
                <Image src={Temporary} className="h-full w-full object-cover" alt="123" />
            </div>
            <div className="-mt-3 flex h-screen w-full flex-col   overflow-hidden rounded-t-3xl bg-[#FAFAFA]">
                123123123
            </div>
        </main>
    )
}
