import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as actions from '../../actions/auth';
import styles from '../../styles/bundle.scss'

class SignupVerify extends Component {
  constructor(props) {
    super(props);

    this.state = { resend: false };
  }

  componentWillMount() {
    this.email = this.props.location.query.email;

    if(!this.props.signup || !this.email) {
      browserHistory.push('/signup');
    }
  }

  resendEmail(props) {
    this.setState({ resend: true });
    this.props.resendVerification(props);
  }

  render() {
    return (
      <div className={ styles.content }>
        <h1>Activate account</h1>
        <h3>Please confirm the verification code we've just emailed you at <u>{ this.email && this.email }</u></h3>
        {
          !this.state.resend ?
            <p className={ styles.resend } onClick={this.resendEmail.bind(this, { email: this.email })}>Resend email verification code</p> :
            <p className={ styles.resended } >Email verification code has been resended</p>
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
  return { errorMessage: state.auth.error, signup: state.auth.signup };
}

export default connect(mapStateToProps, actions)(SignupVerify);