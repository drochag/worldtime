import React, { memo } from 'react'
import SuggestionRow from 'components/SuggestionRow'
import { ExtendedSuggestionWithDifference, SuggestionsListProps } from 'types'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'

const SortableItem = SortableElement(
  ({
    suggestion,
    onRemove,
  }: {
    suggestion: ExtendedSuggestionWithDifference
    onRemove: SuggestionsListProps['onRemove']
  }) => {
    return <SuggestionRow key={suggestion.formatted_address} onRemove={onRemove} {...suggestion} />
  }
)

const SortableList = SortableContainer(
  ({
    selectedSuggestions,
    onRemove,
  }: {
    selectedSuggestions: SuggestionsListProps['selectedSuggestions']
    onRemove: SuggestionsListProps['onRemove']
  }) => (
    <ul className="list-none pl-0 pt-4 sticky -left-1 bg-white duration-300 transition-colors ease-linear dark:bg-darkSecondary pr-4 z-10">
      {selectedSuggestions.map((item, index) => (
        <SortableItem
          key={item.formatted_address}
          index={index}
          suggestion={item}
          onRemove={onRemove}
        />
      ))}
    </ul>
  )
)

const SuggestionsList: React.FC<SuggestionsListProps> = ({
  onRemove,
  selectedSuggestions,
  moveSuggestion,
}) => (
  <SortableList
    useDragHandle
    onSortEnd={moveSuggestion}
    selectedSuggestions={selectedSuggestions}
    onRemove={onRemove}
    lockAxis="y"
    helperClass="draggedElement"
  />
)

export default memo(SuggestionsList)
