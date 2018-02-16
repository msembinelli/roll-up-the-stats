import { identity } from 'lodash'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'

const devToolsExtension = window.devToolsExtension

export default function configureStore() {
  return createStore(
    () => {}, //TODO add combineReducers statement
    undefined,
    compose(
      applyMiddleware(thunkMiddleware),
      devToolsExtension ? devToolsExtension() : identity
    )
  )
}
