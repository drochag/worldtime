import React, { memo } from 'react'
import SuggestionRow from 'components/SuggestionRow'
import { SuggestionsListProps } from 'types'

const SuggestionsList: React.FC<SuggestionsListProps> = ({
  onRemove,
  setHome,
  selectedSuggestions,
}) => (
  <div className="pt-4 sticky -left-1 bg-white duration-300 transition-colors ease-linear dark:bg-darkSecondary pr-4 z-10">
    {selectedSuggestions.map((suggestion, idx) => (
      <SuggestionRow
        key={suggestion.formatted_address}
        idx={idx}
        onRemove={onRemove}
        setHome={setHome}
        suggestion={suggestion}
      />
    ))}
  </div>
)

export default memo(SuggestionsList)
