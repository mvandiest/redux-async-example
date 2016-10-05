import React from 'react'
import express from "express"
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import { loadOnServer } from 'redux-connect'
import Helmet from 'react-helmet'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { ReduxAsyncConnect } from 'redux-connect'
import configureStore from '../shared/store'

const app = express();

// set up Jade
app.set('views', './views');
app.set('view engine', 'jade');

import routes from "../shared/routes";

app.get('/*', function (req, res) {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      /*
       let content = renderToString(<RouterContext {...renderProps} />)

        let helmet = Helmet.rewind();
        res.render('index', { content, helmet });
      */
      const store = configureStore({})
      loadOnServer({ ...renderProps, store }).then(() => {
        //console.log('loadOnServer.begin', renderProps, store)
        let content = renderToString(<Provider store={store} key="provider">
            <ReduxAsyncConnect {...renderProps} />
        </Provider>)
        //console.log('loadOnServer.end')

        let helmet = Helmet.rewind();
        let state = store.getState()
        res.render('index', { content, helmet, state });
      })
    } else {
      res.status(404).send('Not found')
    }
  })
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
