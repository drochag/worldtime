import React, { ChangeEvent, useState } from 'react'
import debounce from 'lodash/debounce'
import Autosuggest from 'react-autosuggest'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import { getPlaces } from '../api'
import { AxiosResponse } from 'axios'

interface SearchProps {
  onSelect: (suggestion: Suggestion) => void
}

interface Location {
  lat: number
  lng: number
}

export interface Suggestion {
  formatted_address: string
  name: string
  geometry: {
    location: Location
    viewport: {
      northeast: Location
      southwest: Location
    }
  }
}

const inputClassNames = `
  bg-sand appearance-none border-2 border-sand rounded
  w-full xl:w-80 md:w-1/2
  py-2 px-4
  rounded-full
  text-gray-700 leading-tight
  focus:outline-none focus:bg-white focus:border-apricot
`

const renderSuggestion = suggestion => <div>{suggestion.formatted_address}</div>

const Search: React.FC<SearchProps> = ({ onSelect }) => {
  const [suggestions, setSuggestions] = useState<AxiosResponse<any> | []>([])
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)

  const onInputChange = (event: ChangeEvent<HTMLInputElement>, { newValue }) => setValue(newValue)

  const getSuggestions = debounce((search: string) => {
    if (search.length < 3) {
      return
    }

    setLoading(true)
    getPlaces(search).then(data => {
      setSuggestions(data)
      setLoading(false)
    })
  }, 1000)

  const onSuggestionsFetchRequested = ({ value: search }) => getSuggestions(search)

  const getSuggestionValue = (s: string) => s
  const onSuggestionsClearRequested = () => setSuggestions([])
  const onSuggestionSelected = (event: ChangeEvent<HTMLInputElement>, { suggestion }) => {
    onSelect(suggestion)
    setValue('')
  }

  const inputProps = {
    placeholder: 'Find place or timezone',
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
      {loading && (
        <>
          <FontAwesomeIcon icon={faSpinner} className="fa-spin mr-3" /> Loading ...
        </>
      )}
    </>
  )
}

export default Search
