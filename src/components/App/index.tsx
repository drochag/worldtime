import React, { useState } from 'react'

import Search, { Suggestion } from 'components/Search'

const App: React.FC = () => {
  const [selectedSiggestons, setSelectedSiggestons] = useState<Suggestion[]>([])
  const selectSuggestion = (suggestion: Suggestion) => {
    setSelectedSiggestons([...selectedSiggestons, suggestion])
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col">
      <h1 className="text-6xl text-white leading-tight mt-12 text-center">WorldtimeLite</h1>
      <div className="w-full p-3 bg-white mt-10 rounded-lg shadow-xl">
        <Search onSelect={selectSuggestion} />
        {selectedSiggestons.map(suggestion => (
          <p key={suggestion.formatted_address}>{suggestion.name}</p>
        ))}
      </div>
    </div>
  )
}

export default App
