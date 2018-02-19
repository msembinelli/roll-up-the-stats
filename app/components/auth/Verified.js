import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import styles from '../../styles/bundle.scss'

class Verified extends Component {
  constructor(props) {
    super(props)
  }

  timeoutRedirect() {
    browserHistory.push('/signin')
  }

  componentWillMount() {
    this.email = this.props.location.query.email
    setTimeout(this.timeoutRedirect, 5000)
  }

  render() {
    return (
      <div className={ styles.content }>
        <h2>Thank you!</h2>
        <h3>Your account at <u>{ this.email && this.email }</u> has been verified. Please login. Redirecting...</h3>
      </div>
    )
  }
}

export default Verified