import React, { useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faHome } from '@fortawesome/free-solid-svg-icons'
import City from 'components/City'
import { AddressComponent, SuggestionProps } from 'types'

const rowClassNames = `
  w-full
  flex
  items-center
  mb-4
  px-4
`

const circleClassNames = `
  w-10 rounded-full bg-sand flex
  h-10 items-center justify-center
  mr-2
`

const getName = (components: AddressComponent[], types: string[]): string => {
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
  difference,
  time,
}) => {
  const onClick = useCallback(() => onRemove(idx), [idx, onRemove])

  return (
    <div className={rowClassNames} key={suggestion.formatted_address}>
      <div className="w-10">
        <FontAwesomeIcon icon={faTrash} className="mr-3" onClick={onClick} />
      </div>
      <div className={circleClassNames}>
        {idx === 0 && <FontAwesomeIcon icon={faHome} onClick={onClick} />}
        {idx !== 0 && (
          <>
            {difference > 0 && '+'}
            {difference}
          </>
        )}
      </div>
      <City
        difference={difference}
        country="MX"
        time={time}
        name={getName(suggestion.address_components, suggestion.types)}
        abbreviation={
          Number.isNaN(Number(suggestion.abbreviation))
            ? suggestion.abbreviation
            : 'GMT' + suggestion.abbreviation
        }
      />
    </div>
  )
}

export default SuggestionRow
