import React, { memo, useCallback, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faHome } from '@fortawesome/free-solid-svg-icons'
import City from 'components/City'
import { AddressComponent, SuggestionProps } from 'types'
import getCountry from 'utils/getCountry'

const rowClassNames = `
  flex
  items-center
  mb-4
  px-2
  transition-colors duration-300
  h-16
  rounded-md
  bg-opacity-50
  dark:bg-opacity-50
`

const circleClassNames = `
  hover:bg-gray-400
  transition-colors duration-600
  circle cursor-pointer
  w-8 rounded-full bg-secondary flex
  h-8 items-center justify-center
  md:mr-2
  text-sm
  md:w-10
  md:h-10
  md:text-lg
`

const recentlyMountedClass = `bg-primary dark:bg-purple-100`

export const getName = (components: AddressComponent[], types: string[]): string => {
  const address = components.find(
    component => component.types[0] === types[0] && component.types[1] === types[1]
  )
  if (address) {
    return address.long_name
  }
  return components[0].long_name
}

const SuggestionRow: React.FC<SuggestionProps> = ({ suggestion, onRemove, idx, setHome }) => {
  const [isRecentlyMounted, setRecentlyMounted] = useState(suggestion.recentlyAdded)

  useEffect(() => {
    setRecentlyMounted(suggestion.recentlyAdded || false)
    setTimeout(() => setRecentlyMounted(false), 300)
  }, [suggestion.recentlyAdded])

  const onDelete = useCallback(() => onRemove(idx), [idx, onRemove])
  const onClickDifference = useCallback(() => setHome(idx), [idx, setHome])

  const country = getCountry(suggestion)

  return (
    <div
      className={rowClassNames + ' ' + (isRecentlyMounted ? recentlyMountedClass : '')}
      key={suggestion.formatted_address}
    >
      <div className="flex items-center text-center md:text-left align-center flex-col md:flex-row">
        <div className="md:w-10 w-6 text-sm md:text-lg cursor-pointer">
          <FontAwesomeIcon icon={faTrash} className="md:mr-3 mb-2 md:mb-0" onClick={onDelete} />
        </div>
        <div className={circleClassNames} onClick={onClickDifference}>
          {idx === 0 && <FontAwesomeIcon icon={faHome} />}
          {idx !== 0 && (
            <>
              {suggestion.difference > 0 && '+'}
              {suggestion.difference}
            </>
          )}
        </div>
      </div>
      <City
        country={country}
        time={suggestion.time}
        name={getName(suggestion.address_components, suggestion.types)}
        abbreviation={suggestion.abbreviation}
      />
    </div>
  )
}

export default memo(SuggestionRow)
