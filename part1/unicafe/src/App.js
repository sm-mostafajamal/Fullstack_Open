import { useState } from 'react'

// Button Component
const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>
// Statistics Component
const Statistics = ({statistics}) =>{
  const total = statistics.good + statistics.neutral + statistics.bad
  if(statistics.good > 0 || statistics.neutral > 0 || statistics.bad > 0){
    return (
      <div>
        <div>good {statistics.good}</div> 
        <div>neutral {statistics.neutral}</div> 
        <div>bad {statistics.bad}</div> 
        <div>all {total}</div> 
        <div>average {(statistics.good - statistics.bad)/total}</div> 
        <div>positive {(statistics.good*100)/total} %</div> 
      </div>
    )
  }else{
    return(
       <div>No feedback given</div>
    )
  }
}


// App Component
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
      <h1>statistics</h1>
      <Statistics statistics={statistics} />
    </div>
  )
}






export default App