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

    const renderYearContent = (year: number) => {
        const currentYear = new Date().getFullYear()
        return (
            <span className="react-datepicker__year-text">
                {year}
                {year < currentYear && <span className="year-label past">Past</span>}
                {year > currentYear && <span className="year-label future">Future</span>}
            </span>
        )
    }

    return (
        <div className="w-full">
            <form className="w-full">
                <div className="w-full">
                    <DatePicker
                        className="custom-datepicker w-full"
M                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="dd-MM-yyyy"
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={15}
                        calendarClassName="custom-calendar"
                        renderYearContent={renderYearContent}
                    />
                </div>
            </form>
        </div>
    )
}

export default ReactDatepicker
