import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'
import { asyncConnect } from 'redux-connect'
import { compose, withProps, setDisplayName, setPropTypes, setStatic  } from 'recompose'
import { connect } from 'react-redux'

const mapStateToProps = (state, props) => {
  return {
    testa: 'Yo',
    hello: state.data.hello
  }
}

function fetchPage(){
  return {
    type: '@forte-exp/PAGE_LOAD',
    data: {
      hello: 'world from Page2'
    }
  }
}

const enhance = compose(
  asyncConnect([{
    promise: ({ store: { dispatch } }) => {
      return dispatch(fetchPage())
    }
  }]),
  connect(mapStateToProps),
  withProps({
    test: 'Hi!!'
  }),
  setDisplayName('Page2Tester'),
  setPropTypes({
    testa: PropTypes.string
  }),
  setStatic('mystat', 'yosef')
)

export default enhance(({ lunch, test, testa, hello }) => {
    return <div>
        <Helmet title={'Page 2 - ' + Date.now()} />
        <h1>Page 2!</h1>
        {lunch}
        {test}
        {testa}
        {hello}
    </div>
})