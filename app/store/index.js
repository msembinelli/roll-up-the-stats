import { identity } from 'lodash'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducers from '../reducers'

const devToolsExtension = window.devToolsExtension

export default function configureStore() {
  return createStore(
    reducers,
    undefined,
    compose(
      applyMiddleware(thunkMiddleware),
      devToolsExtension ? devToolsExtension() : identity
    )
  )
}
