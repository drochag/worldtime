import React, { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

import Search from 'components/Search'
import Suggestions from 'components/Suggestions'
import useInterval from 'utils/useInterval'

const App: React.FC = () => {
  const [time, setTime] = useState(new Date())

  useInterval(() => {
    setTime(new Date())
  }, 1000 * (60 - time.getSeconds()))

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl text-white leading-tight mt-12 text-center">
          WorldtimeLite
        </h1>
      </div>
      <div className="max-w-7xl w-full mx-auto">
        <Suggestions time={time}>{props => <Search {...props} />}</Suggestions>
      </div>
      <footer className="text-white pb-4 mt-4 text-center w-full">
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
