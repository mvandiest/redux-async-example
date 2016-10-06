import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'
import { asyncConnect } from 'redux-connect'
import { compose, setDisplayName, setPropTypes, withProps  } from 'recompose'
import { connect } from 'react-redux'
import { fetchPostById } from '../store/actions'

const enhance = compose(
  asyncConnect([
    {
      promise: ({ store: { dispatch }, params }) => {
        return dispatch(fetchPostById(params.postId))
      }
    }
  ]),
  connect((state, props) => {
    return {
      post: state.data.posts[props.params.postId]
    }
  }),
  withProps({
    head: {
      title: 'Page 3',
      meta: [
        {"property": "og:type", "content": "TEST"}
      ],
      link: [
          {"rel": "canonical", "href": "TEST"}
      ],
      script: [
        {"type": "application/ld+json", innerHTML: `{ "@context": "http://schema.org/TEST" }`}
      ]
    }
  }),
  setDisplayName('Page3'),
  setPropTypes({
    head: PropTypes.object
  })
)

export default enhance(({ head, post }) => {
  return <div>
    <Helmet {...head} />
    <h1>Page 3</h1>
    HI!!!!!!!!!
    {post.body}
  </div>
})
