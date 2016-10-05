import { reducer } from 'redux-connect'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import dataReducer from './dataReducer'

export default function configureStore(initialState) {
    return createStore(
        combineReducers({ reduxAsyncConnect: reducer, data: dataReducer }),
        initialState,
        compose(
          typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
        )
    )
}
