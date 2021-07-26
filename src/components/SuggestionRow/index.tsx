import React, { memo, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faHome } from '@fortawesome/free-solid-svg-icons'
import City from 'components/City'
import { AddressComponent, SuggestionProps } from 'types'

const rowClassNames = `
  flex
  items-center
  mb-4
  px-2
  h-16
`

const circleClassNames = `
  circle cursor-pointer
  w-8 rounded-full bg-sand flex
  h-8 items-center justify-center
  md:mr-2
  text-sm
  md:w-10
  md:h-10
  md:text-lg
`

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
  suggestion,
  onRemove,
  idx,
  homeTime,
  setHome,
  time,
}) => {
  const onDelete = useCallback(() => onRemove(idx), [idx, onRemove])
  const onClickDifference = useCallback(() => setHome(idx), [idx, setHome])
  const suggestionTime = new Date(
    new Date(time).toLocaleString('en-US', { timeZone: suggestion.timezone.timeZoneId })
  )

  let difference = suggestionTime.getTime() - homeTime.getTime()

  difference /= 60 * 60 * 1000
  return (
    <div className={rowClassNames} key={suggestion.formatted_address}>
      <div className="flex items-center text-center md:text-left align-center flex-col md:flex-row">
        <div className="md:w-10 w-6 text-sm md:text-lg cursor-pointer">
        <FontAwesomeIcon icon={faTrash} className="md:mr-3 mb-2 md:mb-0" onClick={onDelete} />
        </div>
        <div className={circleClassNames} onClick={onClickDifference}>
          {idx === 0 && <FontAwesomeIcon icon={faHome} />}
          {idx !== 0 && (
            <>
              {difference > 0 && '+'}
              {difference}
            </>
          )}
        </div>
      </div>
      <City
        difference={difference}
        country={
          suggestion.address_components.find(component =>
            component.types.find(type => type === 'country')
          )?.short_name || ''
        }
        time={time}
        name={getName(suggestion.address_components, suggestion.types)}
        abbreviation={suggestion.abbreviation}
      />
    </div>
  )
}

export default memo(SuggestionRow)
