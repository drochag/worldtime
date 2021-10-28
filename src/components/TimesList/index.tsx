import React, { memo } from 'react'

import { TimesListProps, TimesListState } from 'types'
import TimeRow from 'components/TimeRow'

const getStyles = (suggestions: number): Record<string, string> => ({
  height: suggestions * 5 - 2 + 'rem',
  top: '.5rem',
  transition: 'left 300ms ease, background 300ms ease',
  left: '2rem',
})

const getHighlightedStyles = (highlighted?: number): Record<string, string> => ({
  left: highlighted !== undefined ? highlighted * 2 + 'rem' : '2rem',
  ...(highlighted !== undefined && { zIndex: '4' }),
})

class TimesList extends React.Component<TimesListProps, TimesListState> {
  state: TimesListState = {
    styles: getStyles(this.props.length),
    highlightedStyles: getHighlightedStyles(1),
  }

  removeHighlight = () => this.setHighlighted(1)
  setHighlighted = (highlighted: number) =>
    this.setState({ highlightedStyles: getHighlightedStyles(highlighted) })

  render() {
    const { styles, highlightedStyles } = this.state

    return (
      <div className="mt-4 pr-5 relative" onMouseLeave={this.removeHighlight}>
        <div
          className="absolute w-8 bg-primary dark:bg-darkPrimary bg-opacity-20 rounded-lg"
          style={styles}
        />
        <div
          className="absolute w-8 border-primary dark:border-purple-200 dark:bg-transparent border-opacity-50 border-2 rounded-lg"
          style={{ ...styles, ...highlightedStyles }}
        />
        {this.props.selectedSuggestions.map(suggestion => (
          <TimeRow
            key={suggestion.formatted_address}
            time={suggestion.time}
            difference={suggestion.difference}
            setHighlighted={this.setHighlighted}
          />
        ))}
      </div>
    )
  }
}

export default memo(TimesList)
