import {
  FETCH_MESSAGES_REQUEST,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_ERROR,
  ADD_MESSAGE_REQUEST,
  ADD_MESSAGE_SUCCESS,
  ADD_MESSAGE_ERROR,
} from '../constants'
import initialState from './initialState'
import messages from '../constants/chat.json'

export function fetchMessagesReducer(state = initialState.messages, action) {
  switch (action.type) {
    case FETCH_MESSAGES_REQUEST:
      return Object.assign({}, state, {
        loading: true,
      })
    case FETCH_MESSAGES_SUCCESS:
      const page = action.pageNo
      const total = messages.length
      const start = total - page * 50
      const end = total - (page - 1) * 50
      const result = messages.slice(start, end)
      let unread = 0
      messages.forEach((item) => {
        if (item.direction === 'in' && item.status === 'received') unread += 1
      })

      return Object.assign({}, state, {
        loading: false,
        data: { messages: result, unread },
      })
    case FETCH_MESSAGES_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: action.error,
      })
    default:
      return state
  }
}

export function postMessageReducer(state = initialState.message, action) {
  switch (action.type) {
    case ADD_MESSAGE_REQUEST:
      return Object.assign({}, state, {
        loading: true,
      })
    case ADD_MESSAGE_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        data: action.data,
      })
    case ADD_MESSAGE_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: action.error,
      })
    default:
      return state
  }
}
