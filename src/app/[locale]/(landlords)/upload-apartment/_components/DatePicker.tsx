import React, { useState, useEffect } from 'react'
import { useDateSelect } from 'react-ymd-date-select'

const georgianMonths = [
    'იანვარი',
    'თებერვალი',
    'მარტი',
    'აპრილი',
    'მაისი',
    'ივნისი',
    'ივლისი',
    'აგვისტო',
    'სექტემბერი',
    'ოქტომბერი',
    'ნოემბერი',
    'დეკემბერი',
]

function DatePicker({ field }: any) {
    const dateSelect = useDateSelect()

    useEffect(() => {
        const formattedDate = `${dateSelect.yearValue}-${String(dateSelect.monthValue).padStart(2, '0')}-${String(dateSelect.dayValue).padStart(2, '0')}`
        field.onChange(formattedDate)
    }, [dateSelect, field])

    return (
        <div>
            <select value={dateSelect.yearValue} onChange={dateSelect.onYearChange}>
                <option value="">{`წელი`}</option>
                {dateSelect.yearOptions.map((yearOption) => (
                    <option key={yearOption.value} value={yearOption.value}>
                        {yearOption.value}
                    </option>
                ))}
            </select>

            <select value={dateSelect.monthValue} onChange={dateSelect.onMonthChange}>
                <option value="">{`თვე`}</option>
                {dateSelect.monthOptions.map((monthOption, index) => (
                    <option key={monthOption.value} value={monthOption.value}>
                        {georgianMonths[index]}
                    </option>
                ))}
            </select>

            <select value={dateSelect.dayValue} onChange={dateSelect.onDayChange}>
                <option value="">{`რიცხვი`}</option>
                {dateSelect.dayOptions.map((dayOption) => (
                    <option key={dayOption.value} value={dayOption.value}>
                        {dayOption.label}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default DatePicker
