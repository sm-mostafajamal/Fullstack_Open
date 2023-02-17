// import { legacy_createStore as createStore } from 'redux'

import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer';
import filterReducer from './reducers/filterReducer';
import { configureStore } from '@reduxjs/toolkit';

// const store = createStore(reducer)

const store = configureStore({
  reducer : {
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
    filter: filterReducer
  }
})


export default store