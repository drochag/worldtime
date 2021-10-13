import React, { memo, useCallback } from 'react'
import { HourProps } from 'types'

const getHourClasses = (hours: number, idx: number): string => {
  const hourClass =
    'relative w-8 h-12 text-sm flex flex-col justify-center items-center text-semibold flex-grow'
  let timeClass = ''
  let borderClass = ''

  if (hours < 6 || hours > 20) {
    timeClass =
      'bg-blue-900 duration-300 transition-colors ease-linear dark:bg-purple-900 text-white'
  } else if (hours < 8 || hours > 17) {
    timeClass = 'bg-blue-200 duration-300 transition-colors ease-linear dark:bg-purple-200'
  } else {
    timeClass = 'bg-gray-200 duration-300 transition-colors ease-linear dark:bg-purple-100'
  }

  if (idx === 0 || hours === 0) {
    borderClass = 'rounded-l-lg '
  }

  if (idx === 23 || hours === 23) {
    borderClass += 'rounded-r-lg '
  }

  return [timeClass, borderClass, hourClass].join(' ')
}

const Hour: React.FC<HourProps> = ({ idx, difference, time, setHighlighted }) => {
  const calculatedTime = new Date(time)
  calculatedTime.setHours(calculatedTime.getHours() - 1 + difference + idx)

  const hours = calculatedTime.getHours()
  const isPM = hours >= 12
  const hourClass = getHourClasses(hours, idx)
  const hasHalfDifference = difference - Math.floor(difference) === 0.5

  const setHighlight = useCallback(() => setHighlighted(idx), [idx, setHighlighted])

  if (hours !== 0) {
    return (
      <div className={hourClass} onClick={setHighlight} onMouseEnter={setHighlight}>
        <span className="hour">
          {isPM ? (hours - 12 === 0 ? 12 : hours - 12) : hours}
          {hasHalfDifference && <span className="minutes text-xxxs align-middle">:&nbsp;30</span>}
        </span>
        <span className="time text-xxs">{isPM ? 'pm' : 'am'}</span>
      </div>
    )
  }

  return (
    <div className={hourClass} onClick={setHighlight} onMouseEnter={setHighlight}>
      <span
        className="day text-xxs mt-1 absolute mb-1 text-black duration-300 transition-colors ease-linear dark:text-blue-900 dark:font-bold"
        style={{ top: '-1.5rem' }}
      >
        {new Intl.DateTimeFormat('en-US', {
          weekday: 'short',
        }).format(calculatedTime)}
      </span>
      <span className="month text-xxs mt-1 mb-1">
        {new Intl.DateTimeFormat('en-US', {
          month: 'short',
        }).format(calculatedTime)}
      </span>
      <span className="date text-xxs">{calculatedTime.getDate()}</span>
    </div>
  )
}

export default memo(Hour)
