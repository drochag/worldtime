import React, { memo, useMemo, useState } from 'react'

import Search from 'components/Search'
import Suggestions from 'components/Suggestions'
import useInterval from 'utils/useInterval'
import withDarkMode, { WithDarkModeProps } from 'hoc/withDarkMode'
import { TimeContext } from 'utils/TimeContext'

import { Moon, Switch, Sun, Heart } from 'components/Icons'

const App: React.FC<Partial<WithDarkModeProps>> = ({ theme, toggleNextTheme }) => {
  const [time, setTime] = useState(new Date())

  useInterval(() => {
    setTime(new Date())
  }, 1000 * (60 - time.getSeconds()))

  const Icon = useMemo(() => (theme === 'light' ? Sun : theme === 'auto' ? Switch : Moon), [theme])

  return (
    <TimeContext.Provider value={time}>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl text-secondary duration-300 transition-colors ease-linear dark:text-darkSecondary leading-tight mt-12 text-center">
          Worldtime Clock
          <button
            className="ml-3 align-middle inline-flex border-2 rounded-full p-2 border-white duration-300 transition-colors ease-linear dark:border-darkSecondary"
            onClick={() => toggleNextTheme!()}
            aria-label="theme"
          >
            <Icon />
          </button>
        </h1>
      </div>
      <div className="max-w-7xl w-full mx-auto">
        <Suggestions>{props => <Search {...props} />}</Suggestions>
      </div>
      <footer className="text-lg text-secondary duration-300 transition-colors ease-linear dark:text-darkSecondary pb-4 mt-4 text-center w-full">
        Made with <Heart /> by&nbsp;
        <a
          className="underline"
          href="http://danielrocha.xyz"
          target="_blank"
          rel="noopener noreferrer"
        >
          Dan Rocha
        </a>
      </footer>
    </TimeContext.Provider>
  )
}

export default withDarkMode(memo(App))
