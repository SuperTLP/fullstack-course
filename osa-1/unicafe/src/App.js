import { useState } from 'react'
import Poll from './components/poll'
import Statistics from './components/statistics'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const stats ={
    "good": {
      number: good,
      "set": setGood
    },
    "neutral": {
      number: neutral,
      "set": setNeutral
    },
    "bad": {
      number: bad,
      "set": setBad
    }
  }

  return (
    <div>
      <Poll stats={stats}></Poll>
      <h2>statistics</h2>
      <Statistics stats={stats}></Statistics>
    </div>
  )
}

export default App