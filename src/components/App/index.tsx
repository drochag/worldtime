import React, { useState, useEffect } from 'react'

import Search from 'components/Search'
import Suggestions from 'components/Suggestions'

const App: React.FC = () => {
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000 * 60)
    return () => clearInterval(interval)
  }, [])
  return (
    <div className="max-w-6xl mx-auto flex flex-col">
      <h1 className="text-6xl text-white leading-tight mt-12 text-center">WorldtimeLite</h1>
      <Suggestions time={time}>{props => <Search {...props} />}</Suggestions>
    </div>
  )
}

export default App
