import styles from '../../styles/bundle.scss'

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { reduxForm, Field } from 'redux-form'
import { sendEntryCsv } from '../../actions/entries'
import { connect } from 'react-redux'

const renderField = ({
  input,
  type,
  placeholder,
  meta: { touched, error },
}) => (
  <div
    className={ `${styles.inputgroup} ${
      touched && error ? styles.haserror : ''
    }` }
  >
    <h4>{ placeholder }</h4>
    <input type={ type } placeholder={ placeholder } { ...input } />
    { touched && error && <div className={ styles.formerror }>{ error }</div> }
  </div>
)

class AddCsv extends Component {
  constructor(props) {
    super(props)

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit(formProps) {
    this.props.sendEntryCsv(formProps)
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <div className={ styles.formcontainer }>
        <h2>Upload a CSV...</h2>
        <form onSubmit={ handleSubmit(this.handleFormSubmit) }>
          { /* File */ }
          <Field
            name="file"
            component={ renderField }
            type="text"
            placeholder=""
          />

          { /* Server error message */ }
          <div>
            { this.props.errorMessage &&
              this.props.errorMessage.entry && (
                <div className={ styles.errorcontainer }>
                  Oops! { this.props.errorMessage.signup }
                </div>
              ) }
          </div>

          { /* Submit button */ }
          <button type="submit" className={ styles.btn }>
            Upload
          </button>
        </form>
      </div>
    )
  }
}

const validate = props => {
  const errors = {}
  const fields = [ 'file' ]

  fields.forEach(f => {
    if (!(f in props)) {
      errors[f] = `${f} is required`
    }
  })

  return errors
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ sendEntryCsv }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ form: 'add-csv', validate })(AddCsv)
)
