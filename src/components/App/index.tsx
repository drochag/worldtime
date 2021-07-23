import React, { useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

import Search from 'components/Search'
import Suggestions from 'components/Suggestions'
import { getHello } from 'components/api'

const App: React.FC = () => {
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    getHello()
    .then(res => console.log(res))
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000 * 60)
    return () => clearInterval(interval)
  }, [])
  return (
    <>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl text-white leading-tight mt-12 text-center">
          WorldtimeLite
        </h1>
      </div>
      <div className="max-w-7xl w-full mx-auto flex-grow">
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
