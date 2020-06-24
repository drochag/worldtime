import React, { useCallback } from 'react'
import { HourProps } from 'types'

const getHourClasses = (hours: number, isFirst: boolean, isLast: boolean): string => {
  const hourClass =
    'relative w-8 h-12 text-sm flex flex-col justify-center items-center text-semibold flex-grow'
  let timeClass = ''
  let borderClass = ''

  if (hours < 6 || hours > 20) {
    timeClass = 'bg-blue-900 text-white'
  } else if (hours < 8 || hours > 17) {
    timeClass = 'bg-blue-200 '
  } else {
    timeClass = 'bg-gray-200 '
  }

  if (isFirst || hours === 0) {
    borderClass = 'rounded-l-lg '
  }

  if (isLast || hours === 23) {
    borderClass += 'rounded-r-lg '
  }

  return [timeClass, borderClass, hourClass].join(' ')
}

const Hour: React.FC<HourProps> = ({ idx, difference, isFirst, isLast, time, setHighlighted }) => {
  const calculatedTime = new Date(time)
  calculatedTime.setHours(calculatedTime.getHours() - 1 + difference + idx)

  const hours = calculatedTime.getHours()
  const isPM = hours >= 12
  const hourClass = getHourClasses(hours, isFirst, isLast)

  const setHighlight = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      setHighlighted(idx)
    },
    [idx, setHighlighted]
  )

  if (hours !== 0) {
    return (
      <div className={hourClass} onClick={setHighlight} onMouseEnter={setHighlight}>
        <span>{isPM ? (hours - 12 === 0 ? 12 : hours - 12) : hours}</span>
        <span className="text-xxs">{isPM ? 'pm' : 'am'}</span>
      </div>
    )
  }

  return (
    <div className={hourClass} onClick={setHighlight} onMouseEnter={setHighlight}>
      <span className="text-xxs mt-1 absolute mb-1 text-black" style={{ top: '-1.5rem' }}>
        {new Intl.DateTimeFormat('en-US', {
          weekday: 'short',
        }).format(calculatedTime)}
      </span>
      <span className="text-xxs mt-1 mb-1">
        {new Intl.DateTimeFormat('en-US', {
          month: 'short',
        }).format(calculatedTime)}
      </span>
      <span className="text-xxs">{calculatedTime.getDate()}</span>
    </div>
  )
}

export default Hour
