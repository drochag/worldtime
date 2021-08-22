import React, { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

import Search from 'components/Search'
import Suggestions from 'components/Suggestions'
import useInterval from 'utils/useInterval'
import useDarkMode from 'hooks/useDarkMode'

const App: React.FC = () => {
  const [time, setTime] = useState(new Date())
  const [colorTheme, setTheme] = useDarkMode()

  useInterval(() => {
    setTime(new Date())
  }, 1000 * (60 - time.getSeconds()))

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl text-secondary dark:text-darkSecondary leading-tight mt-12 text-center">
          WorldtimeLite
          <button
            className="ml-3 align-middle border-2 rounded-full p-2 border-white dark:border-darkSecondary"
            onClick={() => setTheme(colorTheme)}
          >
            {colorTheme === 'light' ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            ) : (
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
            )}
          </button>
        </h1>
      </div>
      <div className="max-w-7xl w-full mx-auto">
        <Suggestions time={time}>{props => <Search {...props} />}</Suggestions>
      </div>
      <footer className="text-secondary dark:text-darkSecondary pb-4 mt-4 text-center w-full">
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

export default App
