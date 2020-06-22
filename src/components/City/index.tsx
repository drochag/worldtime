import React from 'react'
import { CityProps } from 'types'

const City: React.FC<CityProps> = ({ name, time, country, difference, abbreviation }) => {
  const date = new Date(time)
  date.setHours(date.getHours() + difference)
  return (
    <div className="w-80 flex justify-between">
      <div className="flex flex-col">
        <span className="font-medium">{name}</span>
        <span className="font-thin">{country}</span>
      </div>
      <div className="flex flex-col text-right">
        <span className="font-medium">
          {new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            minute: 'numeric',
          }).format(date)}{' '}
          {abbreviation}
        </span>
        <span className="font-thin">
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
