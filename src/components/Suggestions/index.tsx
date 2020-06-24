import React from 'react'
import SuggestionsList from 'components/SuggestionsList'
import { getExtendedSuggestion } from 'components/api'
import { SuggestionsProps, SuggestionsState, Suggestion } from 'types'
import info from './info.json'
import TimesList from 'components/TimesList'
import ls from 'local-storage'

class Suggestions extends React.Component<SuggestionsProps> {
  state: SuggestionsState = {
    loading: false,
    selectedSuggestions: ls('suggestions') || [],
    // selectedSuggestions: info, // debugging purposes
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
  }

  render() {
    return (
      <div className="w-full p-3 bg-white mt-10 rounded-lg shadow-xl">
        {this.props.children({
          onSelect: this.selectSuggestion,
          loading: this.state.loading,
        })}
        <div className="md:hidden mt-4 text-center text-apricot font-medium">
          Tap a time to move the ruler
        </div>
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
