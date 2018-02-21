import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import * as actions from '../../actions/resetPassword'
import { connect } from 'react-redux'
import styles from '../../styles/bundle.scss'

const renderInput = field =>
  <div className={ styles.inputgroup }>
    <input type={ field.type } placeholder={ field.placeholder } { ...field.input } />
  </div>

class ResetPassword extends Component {
  constructor(props) {
    super(props)

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit(props) {
    this.props.resetPassword(props)
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <div className={ styles.formcontainer }>
        <h2>Reset Password</h2>
        <form onSubmit={ handleSubmit(this.handleFormSubmit) }>

          { /* Email */}
          <div className={ styles.inputgroup }>
            <Field name="email" type="text" placeholder="Type your email" component={ renderInput } />
          </div>

          { /* Server error message */}
          <div>
            { this.props.errorMessage && this.props.errorMessage.resetPassword &&
              <div className={ styles.errorcontainer }>{ this.props.errorMessage.resetPassword }</div> }
          </div>

          { /* Submit button */}
          <button type="submit" className={ styles.btn }>Submit</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.resetPass.error }
}

export default connect(mapStateToProps, actions)(
  reduxForm({ form: 'resetpassword' })(ResetPassword)
)
