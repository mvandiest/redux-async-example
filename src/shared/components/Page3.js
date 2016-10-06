import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'
import { compose, setDisplayName, setPropTypes, withProps  } from 'recompose'

const enhance = compose(
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

export default enhance(({ head }) => {
  return <div>
    <Helmet {...head} />
    <h1>Page 3</h1>
    HI!!!!!!!!!
  </div>
})
