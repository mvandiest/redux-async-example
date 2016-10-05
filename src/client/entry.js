import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { ReduxAsyncConnect } from 'redux-connect'
import routes from '../shared/routes'
import configureStore from '../shared/store'

const store = configureStore(window.__data)

render(
  <Provider store={store}>
    <Router render={(props) => <ReduxAsyncConnect {...props}/>} history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
)
