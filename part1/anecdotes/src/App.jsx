import { useState } from 'react'

const App = () => {
    // List of anecdotes
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ]

    // Hook
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(anecdotes.map((_) => 0))

    // Increase selected by 1 and return new list
    const newVotes = (votes, selected) => {
        let nV = [...votes]
        nV[selected] = nV[selected] + 1
        return nV
    }

    // Find maximum index of list
    const maxVotes = (votes) => {
        let maxVote = votes[0]
        let maxIndex = 0
        for (let i = 1; i < votes.length; i++) {
            if (votes[i] > maxVote) {maxVote = votes[i]; maxIndex = i;}
        }
        return maxIndex
    }

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "start"}}>
            <h1>Anecdote of the day</h1>
            {anecdotes[selected]}
            <p>Has {votes[selected]} votes</p>
            <div style={{display: "flex", flexDirection: "row", alignItems: "start"}}>
                <button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))}>Generate random anecdote</button>
                <button onClick={() => setVotes(newVotes(votes, selected))}>Vote</button>
            </div>
            <h1>Anecdote with most votes</h1>
            {anecdotes[maxVotes(votes)]}
        </div>
    )
}

export default App