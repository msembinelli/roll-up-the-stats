import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as actions from '../../actions/auth'
import styles from '../../styles/bundle.scss'

class Signout extends Component {
  timeoutRedirect() {
    browserHistory.push('/')
  }

  componentWillMount() {
    this.props.signoutUser()
    setTimeout(this.timeoutRedirect, 5000)
  }

  render() {
    return (
      <div className={ styles.content }>
        <h2>Signed out!</h2>
        <h3>Time to go buy another coffee...</h3>
      </div>
    )
  }
}

export default connect(null, actions)(Signout)
