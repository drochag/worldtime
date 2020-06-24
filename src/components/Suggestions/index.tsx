import React from 'react'
import SuggestionsList from 'components/SuggestionsList'
import { getExtendedSuggestion } from 'components/api'
import { SuggestionsProps, SuggestionsState, Suggestion } from 'types'
// import info from './info.json' // debugging purposes
import TimesList from 'components/TimesList'
import ls from 'local-storage'

class Suggestions extends React.Component<SuggestionsProps, SuggestionsState> {
  state: SuggestionsState = {
    loading: false,
    selectedSuggestions: ls('suggestions') || [],
    // selectedSuggestions: info, // debugging purposes
    noSuggestions: false,
  }

  selectSuggestion = (suggestion: Suggestion) => {
    this.setState({ loading: true })
    getExtendedSuggestion(suggestion).then(extendedSuggestion => {
      const newSuggestions = [...this.state.selectedSuggestions, extendedSuggestion]
      this.setState({
        loading: false,
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

  onSuggestionsShown = (isEmpty: boolean) => {
    this.setState({ noSuggestions: isEmpty })
  }

  render() {
    return (
      <div className="w-full p-3 bg-white mt-10 rounded-lg shadow-xl">
        {this.props.children({
          onSelect: this.selectSuggestion,
          onSuggestionsShown: this.onSuggestionsShown,
          loading: this.state.loading,
        })}
        {this.state.selectedSuggestions.length > 0 && (
          <div className="md:hidden mt-4 text-center text-apricot font-medium">
            Tap a time to move the ruler.
          </div>
        )}
        {!this.state.selectedSuggestions.length && (
          <div className="mt-4 text-center text-apricot font-medium">
            Search a place to show its time.
          </div>
        )}
        {this.state.noSuggestions && (
          <div className="mt-4 text-center text-apricot font-medium">
            Nothing found with that name, try again.
          </div>
        )}
        <div className="overflow-x-auto flex relative xxl:justify-center">
          <SuggestionsList
            time={this.props.time}
            selectedSuggestions={this.state.selectedSuggestions}
            onRemove={this.removeSuggestion}
          />
          <TimesList time={this.props.time} selectedSuggestions={this.state.selectedSuggestions} />
        </div>
      </div>
    )
  }
}

export default Suggestions
