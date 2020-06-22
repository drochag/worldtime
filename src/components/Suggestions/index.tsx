import React from 'react'
import SuggestionsList from 'components/SuggestionsList'
import { getExtendedSuggestion } from 'components/api'
import { SuggestionsProps, SuggestionsState, Suggestion } from 'types'
import info from './info.json'

class Suggestions extends React.Component<SuggestionsProps> {
  state: SuggestionsState = {
    loading: false,
    selectedSuggestions: info,
  }

  selectSuggestion = (suggestion: Suggestion) => {
    this.setState({ loading: true })
    getExtendedSuggestion(suggestion).then(extendedSuggestion =>
      this.setState({
        loading: false,
        selectedSuggestions: [...this.state.selectedSuggestions, extendedSuggestion],
      })
    )
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
        <SuggestionsList
          time={this.props.time}
          selectedSuggestions={this.state.selectedSuggestions}
          onRemove={this.removeSuggestion}
        />
      </div>
    )
  }
}

export default Suggestions
