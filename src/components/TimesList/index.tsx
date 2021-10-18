import React, { useState, useCallback, memo, useMemo } from 'react'

import { TimesListProps } from 'types'
import TimeRow from 'components/TimeRow'

const getStyles = (suggestions: number): Record<string, string> => ({
  height: suggestions * 5 - 2 + 'rem',
  top: '.5rem',
  transition: 'left 300ms ease, background 300ms ease',
})

const getHighlightedStyles = (highlighted?: number): Record<string, string> => ({
  left: highlighted !== undefined ? highlighted * 2 + 'rem' : '2rem',
  ...(highlighted !== undefined && { zIndex: '4' }),
})

const TimesList: React.FC<TimesListProps> = ({ selectedSuggestions }) => {
  const [highlighted, setHighlighted] = useState(1)
  const removeHighlight = useCallback(() => setHighlighted(1), [])
  const styles = useMemo(() => getStyles(selectedSuggestions.length), [selectedSuggestions.length])
  const highlightedStyles = useMemo(() => getHighlightedStyles(highlighted), [highlighted])

  return (
    <div className="mt-4 pr-5 relative" onMouseLeave={removeHighlight}>
      <div
        className="absolute w-8 bg-primary dark:bg-darkPrimary bg-opacity-20 rounded-lg"
        style={styles}
      />
      <div
        className="absolute w-8 border-primary dark:border-purple-200 dark:bg-transparent border-opacity-50 border-2 rounded-lg"
        style={{ ...styles, ...highlightedStyles }}
      />
      {selectedSuggestions.map(suggestion => (
        <TimeRow
          key={suggestion.formatted_address}
          time={suggestion.time}
          setHighlighted={setHighlighted}
          difference={suggestion.difference}
        />
      ))}
    </div>
  )
}

export default memo(TimesList)
