import React from 'react'
import SuggestionsList from 'components/SuggestionsList'
import { getExtendedSuggestion } from 'components/api'
import { SuggestionsProps, SuggestionsState, Suggestion, ExtendedSuggestion } from 'types'
// import info from './info.json' // debugging purposes
import TimesList from 'components/TimesList'
import ls from 'local-storage'

class Suggestions extends React.Component<SuggestionsProps, SuggestionsState> {
  state: SuggestionsState = {
    loading: false,
    existingSuggestion: false,
    noSuggestions: false,
    selectedSuggestions: ls('suggestions') || [],
    // selectedSuggestions: info, // debugging purposes
  }

  setHome = (homeIdx: number) => {
    const selectedSuggestions = [
      this.state.selectedSuggestions[homeIdx],
      ...this.state.selectedSuggestions.filter((s, idx) => idx !== homeIdx),
    ]
    this.setState({ selectedSuggestions })
    ls('suggestions', selectedSuggestions)
  }

  selectSuggestion = (suggestion: Suggestion) => {
    this.setState({ loading: true })
    getExtendedSuggestion(suggestion).then((extendedSuggestion: void | ExtendedSuggestion) => {
      if (!extendedSuggestion) {
        return
      }

      if (
        this.state.selectedSuggestions.find(
          s => s.formatted_address === extendedSuggestion.formatted_address
        )
      ) {
        this.setState({ loading: false, existingSuggestion: true })
        return
      }

      const newSuggestions = [...this.state.selectedSuggestions, extendedSuggestion]
      this.setState({
        loading: false,
        existingSuggestion: false,
        selectedSuggestions: newSuggestions,
      })
      ls('suggestions', newSuggestions)
    })
  }

  removeSuggestion = (idx: number) => {
    const selectedSuggestions = [...this.state.selectedSuggestions]
    selectedSuggestions.splice(idx, 1)
    this.setState({ selectedSuggestions })
    ls('suggestions', selectedSuggestions)
  }

  render() {
    const withDifference = this.state.selectedSuggestions.map(suggestion => ({
      ...suggestion,
      difference:
        (suggestion.timezone.rawOffset - this.state.selectedSuggestions[0].timezone.rawOffset) /
        60 /
        60,
    }))
    return (
      <div className="w-full p-3 bg-white duration-300 transition-colors ease-linear dark:bg-darkSecondary mt-10 rounded-lg shadow-xl">
        {this.props.children({
          onSelect: this.selectSuggestion,
          loading: this.state.loading,
        })}
        {this.state.selectedSuggestions.length === 0 && (
          <div className="mt-4 text-center text-primary duration-300 transition-colors ease-linear dark:text-darkPrimary font-medium">
            Search a place to show its time.
          </div>
        )}
        {this.state.selectedSuggestions.length !== 0 && (
          <div className="mt-4 text-center text-primary duration-300 transition-colors ease-linear dark:text-darkPrimary font-medium">
            <span className="md:hidden mr-2">Tap a time to move the ruler.</span>
            You can tap the circles to set that location as your home.
          </div>
        )}
        {this.state.existingSuggestion && (
          <div className="mt-4 text-center text-primary duration-300 transition-colors ease-linear dark:text-darkPrimary font-medium">
            You've already added that location
          </div>
        )}
        {this.state.selectedSuggestions.length !== 0 && (
          <div className="overflow-x-auto flex relative xxl:justify-center">
            <SuggestionsList
              time={this.props.time}
              selectedSuggestions={withDifference}
              onRemove={this.removeSuggestion}
              setHome={this.setHome}
            />
            <TimesList time={this.props.time} selectedSuggestions={withDifference} />
          </div>
        )}
      </div>
    )
  }
}

export default Suggestions
