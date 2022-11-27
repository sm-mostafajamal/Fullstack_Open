import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App';
import { legacy_createStore as createStore } from 'redux'

const statistics = {
  good: 0,
  neutral: 0,
  bad: 0
}

const counterReducer = (state = statistics, action) => {
  switch(action.type) {
      case 'GOOD': 
        return { ...state, good: state.good + 1};
      case 'NEUTRAL': 
        return { ...state, neutral: state.neutral + 1};
      case 'BAD': 
        return { ...state, bad: state.bad + 1};
      default: 
        return state; 
  }
}
const store = createStore(counterReducer)

// Button Component
const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

// Statistics Component
const Statistics = ({statistics}) =>{
  const good = store.getState().good
  const neutral = store.getState().neutral
  const bad = store.getState().bad

  const total = good + neutral + bad

  if(good > 0 || neutral > 0 || bad > 0){
    return (
        <table>
          <tbody>
              <StatisticLine text="good" value ={good} />
              <StatisticLine text="neutral" value ={neutral} />
              <StatisticLine text="bad" value ={bad} />
              <StatisticLine text="all" value ={total} />
              <StatisticLine text="average" value ={(good - bad)/total} />
              <StatisticLine text="positive" value = {`${(good*100)/total} %`} /> 
          </tbody>
        </table>
    )
  }
  else return <div>No feedback given</div>
}

// StatisticLine Component
const StatisticLine = ({text, value}) =>{
  return (
    <tr>
      <td>{text}</td> 
      <td>{value}</td>
    </tr>
)}


const App = () => {
  return (
    <div>
      <h1>give feedback</h1>
      {/* <div>
        <div>
          Good: {store.getState().good}
        </div>
        <div>
          NEUTRAL: {store.getState().neutral}
        </div>
        <div>
          BAD: {store.getState().bad}
        </div>
      </div> */}
      <div>
        <Button onClick = {() => store.dispatch({ type: 'GOOD'})} text = 'GOOD' />
        <Button onClick = {() => store.dispatch({ type: 'NEUTRAL'})} text = 'NEUTRAL' />
        <Button onClick = {() => store.dispatch({ type: 'BAD'})} text = 'BAD' />
      </div>
      <h1>statistics</h1>
      <Statistics statistics={statistics} />
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => root.render(<App />)
renderApp()
store.subscribe(renderApp)

