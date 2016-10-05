import React from "react";
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { match, Router, browserHistory, RouterContext } from 'react-router'
import { ReduxAsyncConnect } from 'redux-connect'
import routes from "../shared/routes";
import configureStore from '../shared/store'

function track() {
    dataLayer.push({
        'dealerIdentifier': 'dealer:' + Date.now(),
        'virtualUrl':'/product/...' ,
        'event':'pageview'
    })
}

const store = configureStore(window.__data)

render(
    <Provider store={store}>
      <Router render={(props) => <ReduxAsyncConnect {...props}/>} history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('app'))