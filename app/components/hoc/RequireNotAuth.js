import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

export default function (ComposedComponent) {
  class NotAuthentication extends Component {
    componentWillMount() {
      if (this.props.authenticated) {
        browserHistory.push('/')
      }
    }

    componentWillUpdate(nextProps) {
      if (nextProps.authenticated) {
        browserHistory.push('/')
      }
    }

    render() {
      return <ComposedComponent { ...this.props } />
    }
  }

  NotAuthentication.propTypes = { authenticated: PropTypes.bool }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated }
  }

  return connect(mapStateToProps)(NotAuthentication)
}
