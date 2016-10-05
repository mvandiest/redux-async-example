import React, { PropTypes, Component } from 'react'
import Helmet from 'react-helmet'
import { asyncConnect } from 'redux-connect'
import { connect } from 'react-redux'

function fetchPage(){
  return {
    type: '@forte-exp/PAGE_LOAD',
    data: {
      hello: 'world from Page1'
    }
  }
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

@asyncConnect([
  /*{
    key: 'lunch',
    promise: ({ params, helpers }) => {
      return Promise.resolve({ id: 1, name: 'Borsch' })
    }
  },*/
  {
    promise: ({ store: { dispatch, getState }, helpers }) => {
      return sleep(2000).then(() => dispatch(fetchPage()))
    }
  }
])
export default class Page1 extends Component {
  render() {
    return <div>
        <Helmet title={'Page 1 - ' + Date.now()} />
        <h1>Page 1!</h1>

    </div>
  }
}