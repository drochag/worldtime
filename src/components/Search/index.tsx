import React, { memo, useCallback } from 'react'
import debounce from 'lodash/debounce'
import Async from 'react-select/async'

import { getPlaces } from '../api'
import { SearchProps, Suggestion } from 'types'

const customStyles = isDarkMode => ({
  container: provided => ({
    ...provided,
    display: 'inline-block',
    maxWidth: '628px',
    width: '100%',
  }),
  control: provided => ({
    ...provided,
    appearance: 'none',
    margin: 0,
    borderRadius: 999,
    background: isDarkMode ? 'rgb(250, 245, 255)' : 'white',
  }),
  dropdownIndicator: () => ({
    display: 'none',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  menu: provided => ({
    ...provided,
    background: isDarkMode ? 'rgb(250, 245, 255)' : 'white',
    borderRadius: '10px',
    zIndex: 999,
  }),
})

const getOptionLabel = suggestion => suggestion.formatted_address

const Search: React.FC<SearchProps> = ({ onSelect, loading }) => {
  const root = window.document.documentElement
  const isDarkMode = root.classList.contains('dark')

  const loadOptions = useCallback(
    debounce((search: string, callback: (suggestions: Suggestion[]) => any) => {
      if (search.length < 3) {
        return
      }

      getPlaces(search).then(data => {
        if (!data) {
          return
        }
        callback(data)
      })
    }, 750),
    []
  )

  const onChange = useCallback(
    item => {
      onSelect(item)
    },
    [onSelect]
  )

  const theme = useCallback(
    // tslint:disable-next-line: no-shadowed-variable
    theme => ({
      ...theme,
      spacing: {
        ...theme.spacing,
        baseUnit: 6,
      },
      colors: {
        primary: !isDarkMode ? '#faf5ff' : '#ebf8ff',
        primary25: !isDarkMode ? '#e9d8fd' : '#bee3f8',
        primary50: !isDarkMode ? '#d6bcfa' : '#90cdf4',
        primary75: !isDarkMode ? '#b794f4' : '#63b3ed',
      },
    }),
    [isDarkMode]
  )

  return (
    <>
      <label htmlFor="search" style={{ visibility: 'hidden' }}>
        Search
      </label>
      <Async
        placeholder="Find place by typing"
        onChange={onChange}
        value={null}
        loadOptions={loadOptions}
        getOptionLabel={getOptionLabel}
        styles={customStyles(!isDarkMode)}
        theme={theme}
        inputId="search"
        isLoading={loading}
      />
    </>
  )
}

export default memo(Search)
