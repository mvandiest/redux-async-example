import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'
import { asyncConnect } from 'redux-connect'
import { compose, setDisplayName, setPropTypes  } from 'recompose'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    testa: 'Yo',
    hello: state.data.hello
  }
}

function fetchPage() {
  return {
    type: '@forte-exp/PAGE_LOAD',
    data: {
      hello: 'world from Page2'
    }
  }
}

const enhance = compose(
  asyncConnect([
    {
      promise: ({ store: { dispatch } }) => {
        return dispatch(fetchPage())
      }
    }
  ]),
  connect(mapStateToProps),
  setDisplayName('Page2'),
  setPropTypes({
    testa: PropTypes.string,
    hello: PropTypes.string
  }),
)

export default enhance(({ testa, hello }) => {
  return <div>
      <Helmet title={'Page 2'} />
      <h1>Page 2!</h1>
      Testa: {testa}<br />
      Hello: {hello}
  </div>
})
