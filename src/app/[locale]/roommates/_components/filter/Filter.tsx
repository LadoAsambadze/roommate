import { Button } from '@/components/ui/button'

export default function Filter({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
    return (
        <>
            <section className=" hidden  h-full w-full  flex-col gap-6 bg-white  p-0 md:flex ">
                <Button className="flex md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    Close
                </Button>
                <input className="mt-10 w-full  border" placeholder="filterinput" />
                <input className="w-full border" placeholder="filterinput" />
                <input className="w-full border " placeholder="filterinput" />
                <input className="w-full border " placeholder="filterinput" />
            </section>
        </>
    )
}
