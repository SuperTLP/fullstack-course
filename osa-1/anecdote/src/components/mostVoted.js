import Anecdote from "./anecdote"

const MostVoted = ({anecdote,votes}) => {
    return (<div>
        <h1>Anecdote with most votes</h1>
        <Anecdote anecdote={anecdote} votes={votes}></Anecdote>
    </div>)
}

export default MostVoted