import { combineReducers } from 'redux'

import { fetchMessagesReducer, postMessageReducer } from './messages'

const appReducer = combineReducers({
  messages: fetchMessagesReducer,
  message: postMessageReducer,
})

const rootReducer = (state, action) => {
  return appReducer(state, action)
}

export default rootReducer
