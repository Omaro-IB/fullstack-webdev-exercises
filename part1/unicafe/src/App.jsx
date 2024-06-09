import { useState } from 'react'


const StatisticLine = ({text, value}) => {
    return (<tr><td>{text}</td><td>{value}</td></tr>)
}


const Statistics = ({good, neutral, bad}) => {
    const total = good + neutral + bad
    if (total === 0) {
        return (
            <p>No feedback given</p>
        )
    }

    const avg = ((good - bad) / total * 100).toFixed(0)
    const pve = (good / total * 100).toFixed(0)

    return (<div>
        <h1>Statistics:</h1>
        <table><tbody>
            <StatisticLine text={"Good"} value={good}></StatisticLine>
            <StatisticLine text={"Neutral"} value={neutral}></StatisticLine>
            <StatisticLine text={"Bad"} value={bad}></StatisticLine>
            <StatisticLine text={"All"} value={total}></StatisticLine>
            <StatisticLine text={"Average"} value={avg+"%"}></StatisticLine>
            <StatisticLine text={"Positive"} value={pve+"%"}></StatisticLine>
        </tbody></table>
    </div>)
}


const Button = ({text, handleClick}) => {return (<button onClick={handleClick}>{text}</button>)}


function App() {
    const [goodCount, setGoodCount] = useState(0)
    const [neutralCount, setNeutralCount] = useState(0)
    const [badCount, setBadCount] = useState(0)

    return (
        <div>
            <h1>Give Feedback:</h1>
            <div style={{flexDirection: "row"}}>
                <Button handleClick={() => setGoodCount(goodCount + 1)} text="Good :)"></Button>
                <Button handleClick={() => setNeutralCount(neutralCount+1)} text="Neutral :|"></Button>
                <Button handleClick={() => setBadCount(badCount+1)} text="Bad :("></Button>
          </div>
            <Statistics good={goodCount} neutral={neutralCount} bad={badCount} />
      </div>
  )
}

export default App
