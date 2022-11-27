import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App';
import { legacy_createStore as createStore } from 'redux'

const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  switch(action.type) {
      case 'GOOD': 
        return { ...state, good: state.good + 1};
      case 'OK': 
        return { ...state, ok: state.ok + 1};
      case 'BAD': 
        return { ...state, bad: state.bad + 1};
      default: 
        return state; 
  }
}
const store = createStore(counterReducer)

const App = () => {
  return (
    <div>
      <div>
        <div>
          Good: {store.getState().good}
        </div>
        <div>
          OK: {store.getState().ok}
        </div>
        <div>
          BAD: {store.getState().bad}
        </div>
      </div>
      <div>
        <button onClick={() => store.dispatch({ type: 'GOOD'})}>GOOD</button>
        <button onClick={() => store.dispatch({ type: 'OK'})}>OK</button>
        <button onClick={() => store.dispatch({ type: 'BAD'})}>BAD</button>
      </div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => root.render(<App />)
renderApp()
store.subscribe(renderApp)

