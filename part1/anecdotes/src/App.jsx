import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(
    {0:0,
    1:0,
    2:0,
    3:0,
    4:0,
    5:0,
    6:0,
    7:0,}
  )

  const handleVote = () =>{
    const newVotes = {...votes}
    newVotes[selected] += 1 

    setVotes(newVotes)
  }

  const handleAnecdote = () =>{
    let position;
  
    do {
      position = Math.floor(Math.random() * anecdotes.length);
    } while (position === selected);
  
    setSelected(position);
  }

  function highestVote() {
    let maxVotes = -Infinity;
    let maxIndex = null;
  
    for (const [key, value] of Object.entries(votes)) {
      if (value > maxVotes) {
        maxVotes = value; 
        maxIndex = key; 
      }
    }
  
    return maxIndex; 
  }
  

  return (
    <div>
      <p style={{fontSize : '20px', fontWeight:'bold'}}>Anecdote of the day</p>
      {anecdotes[selected]}
      <p>has {votes[selected]} votes</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleAnecdote}>next anecdote</button>
      <p style={{fontSize : '20px', fontWeight:'bold'}}>Anecdote with most votes</p>
      {votes[highestVote()] > 0 ? (
        <div>
          {anecdotes[highestVote()]}
        </div>
      ) : (
        ""
      )}

    </div>
  )
}

export default App