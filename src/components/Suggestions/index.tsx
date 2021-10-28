import React, { memo } from 'react'
import SuggestionsList from 'components/SuggestionsList'
import { getExtendedSuggestion } from 'components/api'
import {
  SuggestionsProps,
  Suggestion,
  ExtendedSuggestion,
  SuggestionsState,
  ExtendedSuggestionWithDifference,
} from 'types'
// import info from './info.json' // debugging purposes
import TimesList from 'components/TimesList'
import ls from 'local-storage'
import { TimeContext } from 'utils/TimeContext'
import { arrayMoveImmutable } from 'array-move'
import getWithDifferences from 'utils/getWithDifferences'

class Suggestions extends React.Component<SuggestionsProps, SuggestionsState> {
  static contextType = TimeContext
  state: SuggestionsState = {
    loading: false,
    existingSuggestion: false,
    selectedSuggestions:
      ls('suggestions').map(suggestion => ({ ...suggestion, time: new Date(suggestion.time) })) ||
      [],
    // selectedSuggestions: info, // debugging purposes
  }

  removeRecentlyAdded = () => {
    const selectedSuggestions = this.state.selectedSuggestions.map(suggestion => ({
      ...suggestion,
      recentlyAdded: false,
    }))
    this.setState({ selectedSuggestions })
    ls('suggestions', selectedSuggestions)
  }

  moveSuggestion = ({ oldIndex: from, newIndex: to }: { oldIndex: number; newIndex: number }) => {
    const selectedSuggestions = getWithDifferences(
      arrayMoveImmutable<ExtendedSuggestionWithDifference>(
        this.state.selectedSuggestions,
        from,
        to
      ),
      this.context
    )
    this.setState({ selectedSuggestions })
    ls('suggestions', selectedSuggestions)
  }

  selectSuggestion = (suggestion: Suggestion) => {
    this.setState({ loading: true })
    getExtendedSuggestion(suggestion).then((extendedSuggestion: void | ExtendedSuggestion) => {
      const existing = this.state.selectedSuggestions.find(
        (s: ExtendedSuggestion) =>
          s.formatted_address === (extendedSuggestion as ExtendedSuggestion).formatted_address
      )
      this.setState({
        existingSuggestion: !!existing,
        loading: false,
      })

      if (!extendedSuggestion || existing) {
        return
      }

      const selectedSuggestions = getWithDifferences(
        [...this.state.selectedSuggestions, extendedSuggestion],
        this.context
      )

      this.setState({ selectedSuggestions })
      ls('suggestions', selectedSuggestions)
    })
  }

  removeSuggestion = (address: string) => {
    const selectedSuggestions = [...this.state.selectedSuggestions].map(s => ({
      ...s,
      recentlyAdded: false,
    }))
    const idx = selectedSuggestions.findIndex(s => s.formatted_address === address)
    selectedSuggestions.splice(idx, 1)
    this.setState({ selectedSuggestions })
    ls('suggestions', selectedSuggestions)
  }

  render() {
    const { selectedSuggestions, existingSuggestion } = this.state

    return (
      <div className="w-full p-3 bg-white duration-300 transition-colors ease-linear dark:bg-darkSecondary mt-10 rounded-lg shadow-xl">
        {this.props.children({
          onSelect: this.selectSuggestion,
          loading: this.state.loading,
        })}
        {selectedSuggestions.length === 0 && (
          <div className="mt-4 text-center text-primary duration-300 transition-colors ease-linear dark:text-blue-900 font-medium">
            Search a place to show its time.
          </div>
        )}
        {selectedSuggestions.length !== 0 && (
          <div className="mt-4 text-center text-primary duration-300 transition-colors ease-linear dark:text-blue-900 font-medium">
            <span className="md:hidden mr-2">Tap a time to move the ruler.</span>
          </div>
        )}
        {existingSuggestion && (
          <div className="mt-4 text-center text-primary duration-300 transition-colors ease-linear dark:text-blue-900 font-medium">
            You've already added that location
          </div>
        )}
        {selectedSuggestions.length !== 0 && (
          <div className="overflow-x-auto flex relative xxl:justify-center">
            <SuggestionsList
              selectedSuggestions={selectedSuggestions}
              onRemove={this.removeSuggestion}
              moveSuggestion={this.moveSuggestion}
            />
            <TimesList
              length={selectedSuggestions.length}
              selectedSuggestions={selectedSuggestions}
            />
          </div>
        )}
      </div>
    )
  }
}

export default memo(Suggestions)
