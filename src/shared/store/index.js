import { reducer } from 'redux-connect'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import dataReducer from './dataReducer'
import fetch from './middleware/fetch'

export default function configureStore(initialState) {
  return createStore(
    combineReducers({ reduxAsyncConnect: reducer, data: dataReducer }),
    initialState,
    compose(
      applyMiddleware(fetch()),
      typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
    )
  )
}
