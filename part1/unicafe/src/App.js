import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseByOne = (f, state) => () => f( state + 1)
  const statistics = {
    good : good,
    neutral: neutral,
    bad: bad
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick = {increaseByOne(setGood, good)} text = 'good' />
      <Button onClick = {increaseByOne(setNeutral, neutral)} text = 'neutral' />
      <Button onClick = {increaseByOne(setBad, bad)} text = 'bad' />
      <Display statistics={statistics} />
    </div>
  )
}



const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Display = ({statistics}) =>{
  if(statistics.good > 0 || statistics.neutral > 0 || statistics.bad > 0){
    return (
      <div>
        <h1>statistics</h1>
        <div>good {statistics.good}</div> 
        <div>neutral {statistics.neutral}</div> 
        <div>bad {statistics.bad}</div> 
      </div>
    )
  }
}



export default App