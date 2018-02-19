import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import * as actions from '../../actions/auth'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import styles from '../../styles/bundle.scss'

const renderField = ({ input, type, placeholder, meta: { touched, error } }) => (
  <div className={ `${ styles.inputgroup } ${ touched && error ? styles.haserror : '' }` }>
    <input type={ type } placeholder={ placeholder } { ...input } />
    { touched && error && <div className={ styles.formerror }>{ error }</div> }
  </div>
)

class Signin extends Component {
  constructor(props) {
    super(props)

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit(props) {
    props.nextUrlPath = this.props.nextUrlPath
    this.props.signinUser(props)
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <div className={ styles.formcontainer }>
        <h2>Sign in</h2>
        <form onSubmit={ handleSubmit(this.handleFormSubmit) }>

          { /* Email */ }
          <Field name="email" component={ renderField } type="text" placeholder="Email" />

          { /* Password */ }
          <Field name="password" component={ renderField } type="password" placeholder="Password" />

          { /* Forgot password */ }
          <div className={ styles.passwordforgot }>
            <Link to="/reset-password">I forgot my password</Link>
          </div>

          { /* Server error message */ }
          { this.props.errorMessage && this.props.errorMessage.signin &&
              <div className={ `${ styles.errorcontainer } ${ styles.signinerror }` }>Oops! { this.props.errorMessage.signin }</div> }

          { /* Signin button */ }
          <button type="submit" className={ styles.btn }>Sign in</button>

          { /* Signup button */ }
          <div className={ styles.formbottom }>
            <p>Don't have an account?</p>
            <Link to="/signup">Click here to sign up</Link>
          </div>
        </form>
      </div>
    )
  }
}

function validate(formProps) {
  const errors = {}

  if(!formProps.email) {
    errors.email = 'Email is required'
  }

  if(!formProps.password) {
    errors.password = 'Password is required'
  }

  return errors
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error, nextUrlPath: state.auth.redirectUrl }
}

export default connect(mapStateToProps, actions)(
    reduxForm({ form: 'signin', validate })(Signin)
)