import React, { ChangeEvent, useState, useEffect } from 'react'
import Autosuggest from 'react-autosuggest'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import { getTimezones } from '../api'

interface SearchProps {
  onSelect: (text: string) => void
  selectedTimezones: string[]
}

const inputClassNames = `
  bg-sand appearance-none border-2 border-sand rounded
  w-full xl:w-80 md:w-1/2
  py-2 px-4
  rounded-full
  text-gray-700 leading-tight
  focus:outline-none focus:bg-white focus:border-apricot
`

const renderSuggestion = suggestion => <div>{suggestion}</div>

const Search: React.FC<SearchProps> = ({ onSelect, selectedTimezones }) => {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [allTimezones, setAllTimezones] = useState<string[]>([])
  const [value, setValue] = useState('')
  const [timezonesLoaded, setLoaded] = useState(false)

  useEffect(() => {
    getTimezones.then(res => {
      setAllTimezones(res.data)
      setLoaded(true)
    })
  }, [])

  const onInputChange = (event: ChangeEvent<HTMLInputElement>, { newValue }) => setValue(newValue)

  const getSuggestions = (search: string) => {
    const inputValue = search.trim().toLowerCase()

    return inputValue.length === 0
      ? []
      : allTimezones.filter(
          timezone =>
            timezone.toLowerCase().indexOf(inputValue) >= 0 &&
            timezone !==
              selectedTimezones.find(
                selected => selected.toLocaleLowerCase().indexOf(inputValue) >= 0
              )
        )
  }

  const onSuggestionsFetchRequested = ({ value: search }) => {
    setSuggestions(getSuggestions(search))
  }

  const getSuggestionValue = (s: string) => s
  const onSuggestionsClearRequested = () => setSuggestions([])
  const onSuggestionSelected = (event: ChangeEvent<HTMLInputElement>, { suggestion }) => {
    onSelect(suggestion)
    setValue('')
  }

  if (!timezonesLoaded) {
    return (
      <h4 className={inputClassNames}>
        <FontAwesomeIcon icon={faSpinner} className="fa-spin mr-3" /> Loading timezones ...
      </h4>
    )
  }

  const inputProps = {
    placeholder: 'Find place or timezone',
    value,
    className: inputClassNames,
    onChange: onInputChange,
  }

  return (
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
  )
}

export default Search
