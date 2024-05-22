export default function Filter({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
    return (
        <>
            {isOpen ? (
                <section className="fixed flex h-full w-full flex-col gap-6 bg-white p-6 md:hidden">
                    <div className="flex h-auto w-full flex-col items-end justify-center gap-5">
                        <button className="flex md:hidden" onClick={() => setIsOpen(!isOpen)}>
                            x
                        </button>
                        <button>Clear filters </button>
                    </div>

                    <input className="mt-10 w-full  border" placeholder="filterinput" />
                    <input className="w-full border" placeholder="filterinput" />
                    <input className="w-full border " placeholder="filterinput" />
                    <input className="w-full border " placeholder="filterinput" />
                </section>
            ) : null}
        </>
    )
}
