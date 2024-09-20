import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { format } from 'date-fns'
import { Input } from '../../ui/input'

interface ReactDatepickerProps {
    field?: {
        onChange: (date: string | null) => void
    }
}

function ReactDatepicker({ field }: ReactDatepickerProps) {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)

    const handleDateChange = (newDate: Date | null) => {
        setSelectedDate(newDate)
        if (field) {
            const formattedDate = newDate ? format(newDate, 'yyyy-MM-dd') : null
            field.onChange(formattedDate)
        }
    }

    console.log(field)

    return (
        <div className="row w-full">
            <form className="row w-full">
                <div className="row mb-0 w-full">
                    <DatePicker
                        className="custom-datepicker w-full"
                        customInput={<Input className="w-full" />}
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="dd-MM-yyyy"
                        showYearDropdown
                        calendarClassName="custom-calendar"
                        // dayClassName={(date) =>
                        //     date.getDay() === 0 || date.getDay() === 6 ? 'weekend-day' : undefined
                        // }
                    />
                </div>
            </form>
        </div>
    )
}

export default ReactDatepicker
