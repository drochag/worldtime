import React, { memo } from 'react'
import { TimeProps } from 'types'
import Hour from 'components/Hour'

const rowClassNames = `h-16 flex items-center mb-4`
const hoursInDay = 24

const TimeRow: React.FC<TimeProps> = ({ time, setHighlighted, difference }) => (
  <div className={rowClassNames}>
    {new Array(hoursInDay).fill('.').map((_, idx) => (
      <Hour
        difference={difference}
        idx={idx}
        key={idx}
        time={time}
        setHighlighted={setHighlighted}
      />
    ))}
  </div>
)

export default memo(TimeRow)
