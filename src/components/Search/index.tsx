import React, { useCallback, useState } from 'react'
import debounce from 'lodash/debounce'
import Async from 'react-select/async';
import tailwind from '../../../tailwind.config'

import { getPlaces } from '../api'
import { SearchProps, Suggestion } from 'types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const customStyles = {
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
  }),
  dropdownIndicator: () => ({
    display: 'none'
  }),
  indicatorSeparator: () => ({
    display: 'none'
  }),
  menu: provided => ({
    ...provided,
    background: 'white',
    borderRadius: '10px',
    zIndex: 999
  }),
}

const getOptionLabel = suggestion => suggestion.formatted_address

const Search: React.FC<SearchProps> = ({ onSelect, loading }) => {
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

  const onChange = useCallback(item => {
    onSelect(item)
  }, [onSelect])

  return (
    <>
      <Async
        placeholder="Find place by typing"
        onChange={onChange}
        value={null}
        loadOptions={loadOptions}
        getOptionLabel={getOptionLabel}
        styles={customStyles}
        theme={theme => ({
          ...theme,
          spacing: {
            ...theme.spacing,
            baseUnit: 6,
          },
          colors: {
            primary: '#ebf8ff',
            primary25: '#bee3f8',
            primary50: '#90cdf4',
            primary75: '#63b3ed',
          }
        })}
      />
      {loading && (
        <div className="inline-block mt-2 md:ml-3 md:mt-0 text-gray-600">
          <FontAwesomeIcon icon={faSpinner} className="fa-spin mr-3" /> Loading ...
        </div>
      )}
    </>
  )
}

export default Search
