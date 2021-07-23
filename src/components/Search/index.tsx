import React, { ChangeEvent, useState, useCallback } from 'react'
import debounce from 'lodash/debounce'
import Autosuggest from 'react-autosuggest'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import { getPlaces } from '../api'
import { SearchProps, Suggestion } from 'types'

const inputClassNames = `
  bg-sand appearance-none border-2 border-sand rounded
  w-full
  py-2 px-4
  rounded-full
  text-gray-700 leading-tight
  focus:outline-none focus:bg-white focus:border-apricot
`

const renderSuggestion = suggestion => <div>{suggestion.formatted_address}</div>
const getSuggestionValue = (s: string) => s

const Search: React.FC<SearchProps> = ({
  onSelect,
  loading: loadingParent,
  onSuggestionsShown,
}) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)

  const getSuggestions = useCallback(
    debounce((search: string) => {
      if (search.length < 3) {
        return
      }

      setLoading(true)
      getPlaces(search).then(data => {
        console.log(data)
        if (!data) {
          return
        }
        setSuggestions(data)
        onSuggestionsShown(!data.length)
        setLoading(false)
      })
    }, 750),
    []
  )

  const onInputChange = (event: ChangeEvent<HTMLInputElement>, { newValue }) => setValue(newValue)
  const onSuggestionsFetchRequested = ({ value: search }) => getSuggestions(search)
  const onSuggestionsClearRequested = () => {
    setSuggestions([])
    onSuggestionsShown(false)
  }
  const onSuggestionSelected = (event: ChangeEvent<HTMLInputElement>, { suggestion }) => {
    onSelect(suggestion)
    setValue('')
  }

  const inputProps = {
    placeholder: 'Find place by typing',
    value,
    className: inputClassNames,
    onChange: onInputChange,
  }

  return (
    <>
      <Autosuggest
        getSuggestionValue={getSuggestionValue}
        suggestions={suggestions}
        onSuggestionSelected={onSuggestionSelected}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        renderSuggestion={renderSuggestion}
        value={value}
        inputProps={inputProps}
      />
      {(loading || loadingParent) && (
        <div className="inline-block mt-2 md:ml-3 md:mt-0 text-gray-600">
          <FontAwesomeIcon icon={faSpinner} className="fa-spin mr-3" /> Loading ...
        </div>
      )}
    </>
  )
}

export default Search
