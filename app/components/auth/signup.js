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

class Signup extends Component {
  constructor(props) {
    super(props)

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit(formProps) {
    this.props.signupUser(formProps)
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <div className={ styles.formcontainer }>
        <h2>Sign up</h2>
        <form onSubmit={ handleSubmit(this.handleFormSubmit) }>

          { /* Firstname */ }
          <Field name="firstname" component={ renderField } type="text" placeholder="First name" />

          { /* Lastname */ }
          <Field name="lastname" component={ renderField } type="text" placeholder="Last name" />

          { /* Email */ }
          <Field name="email" component={ renderField } type="text" placeholder="Email" />

          { /* Password */ }
          <Field name="password" component={ renderField } type="password" placeholder="Password" />

          { /* Email */ }
          <Field name="repassword" component={ renderField } type="password" placeholder="Repeat Password" />

          { /* Server error message */ }
          <div>
            { this.props.errorMessage && this.props.errorMessage.signup &&
                <div className={ styles.errorcontainer }>Oops! { this.props.errorMessage.signup }</div> }
          </div>

          { /* Submit button */ }
          <button type="submit" className={ styles.btn }>Sign up</button>

          { /* Sign in button */ }
          <div className={ styles.formbottom }>
            <p>Already signed up?</p>
            <Link to="/signin">Click here to sign in</Link>
          </div>
        </form>
      </div>
    )
  }
}

const validate = props => {
  const errors = {}
  const fields = [ 'firstname', 'lastname', 'email', 'password', 'repassword' ]

  fields.forEach((f) => {
    if(!(f in props)) {
      errors[f] = `${f} is required`
    }
  })

  if(props.firstname && props.firstname.length < 3) {
    errors.firstname = 'minimum of 4 characters'
  }

  if(props.firstname && props.firstname.length > 20) {
    errors.firstname = 'maximum of 20 characters'
  }

  if(props.lastname && props.lastname.length < 3) {
    errors.lastname = 'minimum of 4 characters'
  }

  if(props.lastname && props.lastname.length > 20) {
    errors.lastname = 'maximum of 20 characters'
  }

  if(props.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(props.email)) {
    errors.email = 'please provide valid email'
  }

  if(props.password && props.password.length < 6) {
    errors.password = 'minimum 6 characters'
  }

  if(props.password !== props.repassword) {
    errors.repassword = "passwords doesn't match"
  }

  return errors
}


function mapStateToProps(state) {
  return { errorMessage: state.auth.error }
}

export default connect(mapStateToProps, actions)(
  reduxForm({ form: 'signup', validate })(Signup)
)
