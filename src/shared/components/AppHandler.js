import React from "react"
import { Link } from 'react-router'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'

function mapStateToProps(state, props) {
  const { reduxAsyncConnect } = state
  const tenant = {
    externalID: 'dealer1',
    name: 'Dealer 1'
  }

  const { routes } = props
  const pageType = routes.reduce((acc, next) => {
    if(next.name) {
      acc.push(next.name)
    }
    return acc
  }, []).join('/')

  return {
    asyncsLoaded: reduxAsyncConnect.loaded,
    dataLayer: {
      dealerIdentifier: tenant.externalID,
      dealerName: tenant.name,
      environment: 'dev',
      property: 'Dealer'
    },
    pageType
  }
}

@connect(mapStateToProps)
export default class AppHandler extends React.Component {
  componentDidMount() {
    if(this.props.asyncsLoaded) {
      this.trackIt()
    }
  }

  componentWillReceiveProps(nextProps) {
    if(!this.props.asyncsLoaded && nextProps.asyncsLoaded) {
      this.trackIt()
    }
  }

  trackIt() {
    const { dataLayer, pageType } = this.props

    const dataLayerMerge = {...dataLayer, ...{ pageType, event: 'page-rendered' }}
    window.dataLayer.push(dataLayerMerge)
  }

  render() {
    const  { children } = this.props
    return <div>
        <Helmet
          htmlAttributes={{"lang": "en"}} // amp takes no value
          title="My Title"
          titleTemplate="SPA Demo - %s"
          //base={{"target": "_blank", "href": "http://mysite.com/"}}
          meta={[
              {"name": "description", "content": "Helmet application"},
              {"property": "og:type", "content": "article"}
          ]}
          link={[
              {"rel": "canonical", "href": "http://mysite.com/example"},
              {"rel": "apple-touch-icon", "href": "http://mysite.com/img/apple-touch-icon-57x57.png"},
              {"rel": "apple-touch-icon", "sizes": "72x72", "href": "http://mysite.com/img/apple-touch-icon-72x72.png"}
          ]}
          script={[
            {"src": "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.15.1/moment.min.js", "type": "text/javascript"},
            {"type": "application/ld+json", innerHTML: `{ "@context": "http://schema.org" }`}
          ]}
        />
        <header>
            <Link to='/'>Home</Link><br/>
            <Link to='/page1'>Page 1</Link><br/>
            <Link to='/page2'>Page 2</Link><br/>
            <Link to='/page3'>Page 3</Link><br/>
        </header>
        <h1>Hello App Handler</h1>
        {children}
        <footer>footer</footer>
    </div>
  }
}
