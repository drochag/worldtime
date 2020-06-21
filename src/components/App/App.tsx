import React, { useState } from 'react'

import Search from 'components/Search'

const App: React.FC = () => {
  const [selectedTimezones, setSelectedTimezones] = useState<string[]>([])
  const selectTimezone = (timezone: string) => {
    setSelectedTimezones([...selectedTimezones, timezone])
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col">
      <h1 className="text-6xl text-white leading-tight mt-12 text-center">WorldtimeLite</h1>
      <div className="w-full p-3 bg-white mt-10 rounded-lg shadow-xl">
        <Search onSelect={selectTimezone} selectedTimezones={selectedTimezones} />
        {selectedTimezones.map(timezone => (
          <p>{timezone}</p>
        ))}
      </div>
    </div>
  )
}

export default App
