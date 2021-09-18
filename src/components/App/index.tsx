import React, { useMemo, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

import Search from 'components/Search'
import Suggestions from 'components/Suggestions'
import useInterval from 'utils/useInterval'
import withDarkMode, { WithDarkModeProps } from 'hoc/withDarkMode'

const moon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
  </svg>
)
const arrows = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4.99255 12.9841C4.44027 12.9841 3.99255 13.4318 3.99255 13.9841C3.99255 14.3415 4.18004 14.6551 4.46202 14.8319L7.14964 17.5195C7.54016 17.9101 8.17333 17.9101 8.56385 17.5195C8.95438 17.129 8.95438 16.4958 8.56385 16.1053L7.44263 14.9841H14.9926C15.5448 14.9841 15.9926 14.5364 15.9926 13.9841C15.9926 13.4318 15.5448 12.9841 14.9926 12.9841L5.042 12.9841C5.03288 12.984 5.02376 12.984 5.01464 12.9841H4.99255Z"
      fill="currentColor"
    />
    <path
      d="M19.0074 11.0159C19.5597 11.0159 20.0074 10.5682 20.0074 10.0159C20.0074 9.6585 19.82 9.3449 19.538 9.16807L16.8504 6.48045C16.4598 6.08993 15.8267 6.08993 15.4361 6.48045C15.0456 6.87098 15.0456 7.50414 15.4361 7.89467L16.5574 9.01589L9.00745 9.01589C8.45516 9.01589 8.00745 9.46361 8.00745 10.0159C8.00745 10.5682 8.45516 11.0159 9.00745 11.0159L18.958 11.0159C18.9671 11.016 18.9762 11.016 18.9854 11.0159H19.0074Z"
      fill="currentColor"
    />
  </svg>
)

const sun = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
      clipRule="evenodd"
    />
  </svg>
)
const App: React.FC<Partial<WithDarkModeProps>> = ({ theme, toggleNextTheme }) => {
  const [time, setTime] = useState(new Date())

  useInterval(() => {
    setTime(new Date())
  }, 1000 * (60 - time.getSeconds()))

  const icon = useMemo(() => (theme === 'light' ? sun : theme === 'auto' ? arrows : moon), [theme])

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl text-secondary duration-300 transition-colors ease-linear dark:text-darkSecondary leading-tight mt-12 text-center">
          Worldtime Clock
          <button
            className="ml-3 align-middle border-2 rounded-full p-2 border-white duration-300 transition-colors ease-linear dark:border-darkSecondary"
            onClick={() => toggleNextTheme!()}
          >
            {icon}
          </button>
        </h1>
      </div>
      <div className="max-w-7xl w-full mx-auto">
        <Suggestions time={time}>{props => <Search {...props} />}</Suggestions>
      </div>
      <footer className="text-secondary duration-300 transition-colors ease-linear dark:text-darkSecondary pb-4 mt-4 text-center w-full">
        Made with <FontAwesomeIcon icon={faHeart} /> by&nbsp;
        <a
          className="underline"
          href="http://danielrocha.xyz"
          target="_blank"
          rel="noopener noreferrer"
        >
          Dan Rocha
        </a>
      </footer>
    </>
  )
}

export default withDarkMode(App)
