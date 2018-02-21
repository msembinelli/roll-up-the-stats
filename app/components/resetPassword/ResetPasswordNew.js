import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import * as actions from '../../actions/resetPassword'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import styles from '../../styles/bundle.scss'

const renderField = ({ input, type, placeholder, meta: { touched, error } }) => (
  <div className={ `${styles.inputgroup} ${touched && error ? styles.haserror : ''}` }>
    <input type={ type } placeholder={ placeholder } { ...input } />
    { touched && error && <div className={ styles.formerror }>{ error }</div> }
  </div>
)

class ResetPasswordNew extends Component {
  constructor(props) {
    super(props)

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  componentWillMount() {
    const { email, token } = this.props.location.query

    this.props.verifyResetPassword({ email, token })
  }

  handleFormSubmit(props) {
    const { email, token } = this.props.location.query

    props.email = email
    props.token = token

    this.props.resetPasswordNew(props)
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <div className={ styles.formcontainer }>
        <h2>Reset Password</h2>
        {
          /* Landing error message */
          this.props.errorMessage && this.props.errorMessage.verifyResetPassword ?
            <div className={ styles.container }>
              <h3>{ this.props.errorMessage.verifyResetPassword.message }</h3>
              {
                this.props.errorMessage.verifyResetPassword.resend &&
                <Link className={ styles.resend } to="/reset-password">Reset Password Again</Link>
              }
            </div>
            :
            /* New password form */
            <form onSubmit={ handleSubmit(this.handleFormSubmit) }>
              { /* New password */}
              <Field name="newpassword" component={ renderField } type="password" placeholder="New password" />

              { /* Repeat new password */}
              <Field name="renewpassword" component={ renderField } type="password" placeholder="Repeat New password" />

              {
                /* Server error message */
                this.props.errorMessage && this.props.errorMessage.verifyResetPassword &&
                <div className={ styles.errorcontainer }>{ this.props.errorMessage.verifyResetPassword.message }</div>
              }

              { /* Submit button */}
              <button type="submit" className={ styles.btn }>Submit</button>
            </form>
        }
      </div>
    )
  }
}

function validate(props) {
  const errors = {}
  const fields = [ 'newpassword', 'renewpassword' ]

  fields.forEach((f) => {
    if (!(f in props)) {
      errors[f] = `${f} is required`
    }
  })

  if (props.newpassword && props.newpassword.length < 6) {
    errors.newpassword = 'minimum 6 characters'
  }

  if (props.newpassword !== props.renewpassword) {
    errors.renewpassword = "passwords doesn't match"
  }

  return errors
}

function mapStateToProps(state) {
  return { errorMessage: state.resetPass.error }
}

export default connect(mapStateToProps, actions)(
  reduxForm({ form: 'resetnewpassword', validate })(ResetPasswordNew)
)
