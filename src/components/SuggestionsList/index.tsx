import React, { memo } from 'react'
import SuggestionRow from 'components/SuggestionRow'
import { SuggestionsListProps } from 'types'

const SuggestionsList: React.FC<SuggestionsListProps> = ({
  onRemove,
  setHome,
  selectedSuggestions,
  time,
}) => (
  <div className="pt-4 sticky -left-1 bg-white pr-4 z-10">
    {selectedSuggestions.map((suggestion, idx) => (
      <SuggestionRow
        key={suggestion.formatted_address}
        idx={idx}
        onRemove={onRemove}
        setHome={setHome}
        suggestion={suggestion}
        time={time}
        homeTime={
          new Date(
            new Date(time).toLocaleString('en-US', {
              timeZone: selectedSuggestions[0].timezone.timeZoneId,
            })
          )
        }
      />
    ))}
  </div>
)

export default memo(SuggestionsList)
