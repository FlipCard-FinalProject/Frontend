import { createStore, combineReducers, applyMiddleware } from 'redux'
import userReducer from './reducers/userReducer'
import setCardReducer from './reducers/setCardReducer'
import cardReducer from './reducers/cardReducer'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
  user: userReducer,
  setCard: setCardReducer,
  card: cardReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
