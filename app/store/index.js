import { identity } from 'lodash'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import counter from 'counter'

const devToolsExtension = window.devToolsExtension

export default function configureStore() {
  return createStore(
    combineReducers({ counter }),
    undefined,
    compose(
      applyMiddleware(thunkMiddleware),
      devToolsExtension ? devToolsExtension() : identity
    )
  )
}
