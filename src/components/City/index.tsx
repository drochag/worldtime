import React from 'react'
import { CityProps } from 'types'

const City: React.FC<CityProps> = ({ name, time, country, difference, abbreviation }) => {
  const date = new Date(time)
  date.setHours(date.getHours() + difference)

  return (
    <div className="ml-2 w-32 md:w-80 text-xs md:text-base flex justify-between flex-col md:flex-row">
      <div className="flex flex-row md:flex-col justify-between md:justify-center">
        <span className="city font-medium">{name}</span>
        <span className="country font-thin w-6 text-xs md:text-sm text-right md:text-left">
          {country}
        </span>
      </div>
      <div className="flex flex-row md:flex-col justify-between md:justify-center md:text-right justify-center">
        <span className="time font-medium mr-2 md:mr-0">
          {new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            minute: 'numeric',
          })
            .format(date)
            .toLowerCase()}{' '}
          {Number.isNaN(Number(abbreviation)) ? abbreviation : 'GMT' + abbreviation}
        </span>
        <span className="date font-thin text-xs md:text-sm text-right">
          {new Intl.DateTimeFormat('en-US', {
            weekday: 'short',
          }).format(date)}
          {', '}
          {new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
          }).format(date)}
        </span>
      </div>
    </div>
  )
}

export default City
