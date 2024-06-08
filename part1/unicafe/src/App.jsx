import { useState } from 'react'

function App() {
  const [goodCount, setGoodCount] = useState(0)
  const [neutralCount, setNeutralCount] = useState(0)
  const [badCount, setBadCount] = useState(0)

  return (
      <div>
          <h1>Give Feedback:</h1>
          <div style={{flexDirection: "row"}}>
              <button onClick={() => setGoodCount(goodCount+1)}>Good :)</button>
              <button onClick={() => setNeutralCount(neutralCount+1)}>Neutral :|</button>
              <button onClick={() => setBadCount(badCount+1)}>Bad :(</button>
          </div>
          <h1>Statistics:</h1>
          <div>
              <p>Good: {goodCount}</p>
              <p>Neutral: {neutralCount}</p>
              <p>Bad: {badCount}</p>
          </div>
      </div>
  )
}

export default App
