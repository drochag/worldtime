import React from 'react'
import { TimeProps } from 'types'
import Hour from 'components/Hour'

const rowClassNames = `h-16 flex items-center mb-4`
const hoursInDay = 24

const TimeRow: React.FC<TimeProps> = ({ time, difference, setHighlighted }) => (
  <div className={rowClassNames}>
    {new Array(hoursInDay).fill('.').map((_, idx) => (
      <Hour
        idx={idx}
        key={idx}
        isFirst={idx === 0}
        isLast={idx === hoursInDay - 1}
        time={time}
        difference={difference}
        setHighlighted={setHighlighted}
      />
    ))}
  </div>
)

export default TimeRow
