import React, { memo, useCallback, useEffect, useState } from 'react'
import City from 'components/City'
import { AddressComponent, SuggestionProps } from 'types'
import getCountry from 'utils/getCountry'
import { Trash, Sort } from 'components/Icons'
import { SortableHandle } from 'react-sortable-hoc'

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

const iconContainerClassNames = `
  md:w-9 w-8 text-sm md:text-lg
`

const iconClassNames = `
  w-5 md:w-8 h-5 md:h-8 p-1 md:p-2 hover:bg-secondary rounded-full overflow-visible
`

const circleClassNames = `
  ${iconClassNames}
  circle
  rounded-full
  flex justify-center items-center
  bg-secondary mx-auto
  cursor-default
`

const recentlyMountedClass = `bg-primary dark:bg-purple-100`

const DragHandle = SortableHandle(() => (
  <div className={iconContainerClassNames}>
    <Sort className={`${iconClassNames} cursor-pointer`} />
  </div>
))

export const getName = (components: AddressComponent[], types: string[]): string => {
  const address = components.find(
    component => component.types[0] === types[0] && component.types[1] === types[1]
  )
  if (address) {
    return address.long_name
  }
  return components[0].long_name
}

const SuggestionRow: React.FC<SuggestionProps> = ({
  abbreviation,
  address_components: addressComponents,
  difference,
  formatted_address: formattedAddress,
  onRemove,
  recentlyAdded,
  time,
  types,
}) => {
  const [isRecentlyMounted, setRecentlyMounted] = useState(recentlyAdded)

  useEffect(() => {
    setRecentlyMounted(recentlyAdded || false)
    setTimeout(() => {
      setRecentlyMounted(false)
    }, 300)
  }, [recentlyAdded])

  const onDelete = useCallback(
    evt => {
      evt.stopPropagation()
      onRemove(formattedAddress)
    },
    [formattedAddress, onRemove]
  )
  const country = getCountry(addressComponents)

  return (
    <li
      className={rowClassNames + ' ' + (isRecentlyMounted ? recentlyMountedClass : '')}
      key={formattedAddress}
    >
      <div className="flex items-center text-center md:text-left align-center flex-col md:flex-row">
        <DragHandle />
        <div className={iconContainerClassNames}>
          <Trash className={`${iconClassNames} cursor-pointer`} onClick={onDelete} />
        </div>
        <div className={iconContainerClassNames}>
          <div className={circleClassNames}>
            {difference > 0 && '+'}
            {difference}
          </div>
        </div>
      </div>
      <City
        country={country}
        time={time}
        name={getName(addressComponents, types)}
        abbreviation={abbreviation}
      />
    </li>
  )
}

export default memo(SuggestionRow)
