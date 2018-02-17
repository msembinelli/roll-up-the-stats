import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as actions from '../../actions/resetPassword';
import styles from '../../styles/bundle.scss'

class ResetPasswordVerify extends Component {
  constructor(props) {
    super(props);

    this.state = { resend: false };
  }

  componentWillMount() {
    this.email = this.props.location.query.email;

    if(!this.props.resetPasswordProgress || !this.email) {
      browserHistory.push('/signin');
    }
  }

  resendEmail(props) {
    this.setState({ resend: true });
    this.props.resetPassword(props);
  }

  render() {
    return (
      <div className={ styles.content }>
        <h2>Reset Password</h2>
        <h3>We've just emailed you password reset instructions at <u>{ this.email && this.email }</u></h3>
        {
          !this.state.resend ?
            <p className={ styles.resend } onClick={this.resendEmail.bind(this, { email: this.email })}>Resend instructions</p> :
            <p className={ styles.resended }>Reset password instructions has been resended</p>
        }
        {
          this.props.errorMessage && this.props.errorMessage.resetPassword &&
            <div className={ styles.errorcontainer }>{ this.props.errorMessage.resetPassword }</div>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { resetPasswordProgress: state.resetPass.resetPassword, errorMessage: state.resetPass.error };
}

export default connect(mapStateToProps, actions)(ResetPasswordVerify);