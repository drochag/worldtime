import React from 'react'
import SuggestionRow from 'components/SuggestionRow'
import { SuggestionsListProps } from 'types'

const SuggestionsList: React.FC<SuggestionsListProps> = ({
  onRemove,
  selectedSuggestions,
  time,
}) => (
  <div className="pt-4 sticky -left-1 bg-white pr-4 z-10">
    {selectedSuggestions.map((suggestion, idx) => (
      <SuggestionRow
        key={suggestion.formatted_address}
        idx={idx}
        onRemove={onRemove}
        suggestion={suggestion}
        time={time}
        difference={
          (suggestion.timezone.rawOffset - selectedSuggestions[0].timezone.rawOffset) / 60 / 60
        }
      />
    ))}
  </div>
)

export default SuggestionsList
