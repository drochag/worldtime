import React, { memo } from 'react'
import { CityProps } from 'types'

const City: React.FC<CityProps> = ({ name, time, country, abbreviation }) => (
  <div className="ml-2 w-32 md:w-80 text-xs md:text-base flex justify-between flex-col md:flex-row">
    <div className="flex flex-row md:flex-col justify-between">
      <span className="city font-medium">{name}</span>
      <span className="country font-extralight w-6 text-xs md:text-sm text-right md:text-left">
        {country}
      </span>
    </div>
    <div className="flex flex-row md:flex-col justify-between md:text-right">
      <span className="time font-medium mr-2 md:mr-0">
        {new Intl.DateTimeFormat('en-us', {
          hour: 'numeric',
          minute: 'numeric',
        })
          .format(time)
          .toLowerCase()}{' '}
        {Number.isNaN(Number(abbreviation)) ? abbreviation : 'GMT' + abbreviation}
      </span>
      <span className="date font-extralight text-xs md:text-sm text-right">
        {new Intl.DateTimeFormat('en-us', {
          weekday: 'short',
        }).format(time)}
        {', '}
        {new Intl.DateTimeFormat('en-us', {
          month: 'short',
          day: 'numeric',
        }).format(time)}
      </span>
    </div>
  </div>
)

export default memo(City)
