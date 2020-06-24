import React, { useState, useCallback } from 'react'

import { TimesListProps } from 'types'
import TimeRow from 'components/TimeRow'

const getStyles = ({
  suggestions,
  highlighted,
}: {
  suggestions: number
  highlighted?: number
}): Record<string, string> => ({
  height: suggestions * 5 - 2 + 'rem',
  top: '.5rem',
  left: highlighted !== undefined ? highlighted * 2 + 'rem' : '2rem',
  transition: 'left 300ms ease',
  ...(highlighted !== undefined && { zIndex: '4' }),
})

const TimesList: React.FC<TimesListProps> = ({ selectedSuggestions, time }) => {
  const [highlighted, setHighlighted] = useState(1)
  const removeHighlight = useCallback(() => setHighlighted(1), [])
  return (
    <div className="mt-4 pr-5 relative" onMouseLeave={removeHighlight}>
      <div
        className="absolute w-8 bg-apricot bg-opacity-20 rounded-lg"
        style={getStyles({ suggestions: selectedSuggestions.length })}
      />
      <div
        className="absolute w-8 border-apricot border-opacity-50 border-2 rounded-lg"
        style={getStyles({ suggestions: selectedSuggestions.length, highlighted })}
      />
      {selectedSuggestions.map((suggestion, idx) => (
        <TimeRow
          key={suggestion.formatted_address}
          time={time}
          setHighlighted={setHighlighted}
          difference={
            (suggestion.timezone.rawOffset - selectedSuggestions[0].timezone.rawOffset) / 60 / 60
          }
        />
      ))}
    </div>
  )
}

export default TimesList
