import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as actions from '../../actions/auth'
import styles from '../../styles/bundle.scss'

class SignupVerify extends Component {
  constructor(props) {
    super(props)

    this.state = { resend: false }
    this.resendEmail = this.resendEmail.bind(this)
  }

  componentWillMount() {
    this.email = this.props.location.query.email

    if(!this.props.signup || !this.email) {
      browserHistory.push('/signin')
    }
  }

  resendEmail(props) {
    this.setState({ resend: true })
    this.props.resendVerification(props)
  }

  render() {
    return (
      <div className={ styles.content }>
        <h2>Activate account</h2>
        <h3>Please confirm the verification code we've just emailed you at <u>{ this.email && this.email }</u></h3>
        {
          !this.state.resend ?
            <p className={ styles.resend } onClick={ this.resendEmail }>Resend email verification code</p> :
            <p className={ styles.resended }>Email verification code has been sent</p>
        }
        {
          this.props.errorMessage && this.props.errorMessage.signupResend &&
            <div className={ styles.errorcontainer }>{ this.props.errorMessage.signupResend }</div>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error, signup: state.auth.signup }
}

export default connect(mapStateToProps, actions)(SignupVerify)