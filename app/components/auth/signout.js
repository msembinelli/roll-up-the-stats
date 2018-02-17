import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions/auth'
import styles from '../../styles/bundle.scss'

class Signout extends Component {
  componentWillMount() {
    this.props.signoutUser()
  }

  render() {
    return <div className={ styles.content }>We hope to see you again soon...</div>
  }
}

export default connect(null, actions)(Signout)