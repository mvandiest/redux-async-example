import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'
import { asyncConnect } from 'redux-connect'
import { compose, setDisplayName, setPropTypes  } from 'recompose'

function fetchPage() {
  return {
    type: '@forte-exp/PAGE_LOAD',
    data: {
      hello: 'world from Page1'
    }
  }
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const enhance = compose(
  asyncConnect([
    {
      key: 'lunch',
      promise: () => {
        return Promise.resolve({ id: 1, name: 'Borsch' })
      }
    },
    {
      promise: ({ store: { dispatch } }) => {
        return sleep(2000).then(() => dispatch(fetchPage()))
      }
    }
  ]),
  setDisplayName('Page1'),
  setPropTypes({
    lunch: PropTypes.object
  })
)

export default enhance(({lunch}) => {
  return <div>
      <Helmet title={'Page 1'} />
      <h1>Page 1!</h1>
      Lunch: {lunch.name}
  </div>
})
