import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { setRedirectUrl } from '../../actions/auth'

export default function(ComposedComponent) {
  class Authentication extends Component {
    constructor(props) {
      super(props)
    }

    authenticateFirst(authenticated, url, setUrlFunc) {
      if (false === authenticated || undefined === authenticated) {
        setUrlFunc(url)
        browserHistory.push('/signin')
      }
    }

    componentWillMount() {
      const { authenticated, setRedirectUrl, location } = this.props
      this.authenticateFirst(authenticated, location.pathname, setRedirectUrl)
    }

    componentWillUpdate(nextProps) {
      const { setRedirectUrl, location } = this.props
      this.authenticateFirst(
        nextProps.authenticated,
        location.pathname,
        setRedirectUrl
      )
    }

    render() {
      const { authenticated } = this.props
      return authenticated ? <ComposedComponent { ...this.props } /> : null
    }
  }

  Authentication.propTypes = { authenticated: PropTypes.bool }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated }
  }

  function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setRedirectUrl }, dispatch)
  }

  return connect(mapStateToProps, mapDispatchToProps)(Authentication)
}
