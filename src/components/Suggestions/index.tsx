import React, { memo } from 'react'
import SuggestionsList from 'components/SuggestionsList'
import { getExtendedSuggestion } from 'components/api'
import { SuggestionsProps, SuggestionsState, Suggestion, ExtendedSuggestion } from 'types'
// import info from './info.json' // debugging purposes
import TimesList from 'components/TimesList'
import ls from 'local-storage'
import { TimeContext } from 'utils/TimeContext'

class Suggestions extends React.Component<SuggestionsProps, SuggestionsState> {
  static contextType = TimeContext
  state: SuggestionsState = {
    loading: false,
    existingSuggestion: false,
    noSuggestions: false,
    selectedSuggestions: ls('suggestions') || [],
    // selectedSuggestions: info, // debugging purposes
  }

  setHome = (homeIdx: number) => {
    const selectedSuggestions = [
      { ...this.state.selectedSuggestions[homeIdx], recentlyAdded: true },
      ...this.state.selectedSuggestions
        .filter((s, idx) => idx !== homeIdx)
        .map(suggestion => ({
          ...suggestion,
          recentlyAdded: false,
        })),
    ]
    this.setState({ selectedSuggestions })
    ls('suggestions', selectedSuggestions)
  }

  selectSuggestion = (suggestion: Suggestion) => {
    const { selectedSuggestions } = this.state
    this.setState({ loading: true })
    getExtendedSuggestion(suggestion).then((extendedSuggestion: void | ExtendedSuggestion) => {
      if (!extendedSuggestion) {
        return
      }

      if (
        selectedSuggestions.find(s => s.formatted_address === extendedSuggestion.formatted_address)
      ) {
        this.setState({ loading: false, existingSuggestion: true })
        return
      }

      const newSuggestions = [
        ...selectedSuggestions.map(s => ({ ...s, recentlyAdded: false })),
        { ...extendedSuggestion, recentlyAdded: true },
      ]
      this.setState({
        loading: false,
        existingSuggestion: false,
        selectedSuggestions: newSuggestions,
      })
      ls('suggestions', newSuggestions)
    })
  }

  removeSuggestion = (idx: number) => {
    const selectedSuggestions = [...this.state.selectedSuggestions].map(suggestion => ({
      ...suggestion,
      recentlyAdded: false,
    }))
    selectedSuggestions.splice(idx, 1)
    this.setState({ selectedSuggestions })
    ls('suggestions', selectedSuggestions)
  }

  render() {
    const { existingSuggestion, loading, selectedSuggestions } = this.state
    const withDifference = selectedSuggestions.map(suggestion => ({
      ...suggestion,
      difference:
        (suggestion.timezone.rawOffset - selectedSuggestions[0].timezone.rawOffset) / 60 / 60,
      time: new Date(
        new Date(this.context).toLocaleString('en-us', {
          timeZone: suggestion.timezone.timeZoneId,
          hour12: false,
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        })
      ),
    }))
    return (
      <div className="w-full p-3 bg-white duration-300 transition-colors ease-linear dark:bg-darkSecondary mt-10 rounded-lg shadow-xl">
        {this.props.children({
          onSelect: this.selectSuggestion,
          loading,
        })}
        {selectedSuggestions.length === 0 && (
          <div className="mt-4 text-center text-primary duration-300 transition-colors ease-linear dark:text-blue-900 font-medium">
            Search a place to show its time.
          </div>
        )}
        {selectedSuggestions.length !== 0 && (
          <div className="mt-4 text-center text-primary duration-300 transition-colors ease-linear dark:text-blue-900 font-medium">
            <span className="md:hidden mr-2">Tap a time to move the ruler.</span>
            You can tap the circles to set that location as your home.
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
              selectedSuggestions={withDifference}
              onRemove={this.removeSuggestion}
              setHome={this.setHome}
            />
            <TimesList selectedSuggestions={withDifference} />
          </div>
        )}
      </div>
    )
  }
}

export default memo(Suggestions)
