import styles from '../../styles/bundle.scss'

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { reduxForm, Field } from 'redux-form'
import { sendEntryCsv } from '../../actions/entries'
import { connect } from 'react-redux'
import Folder from 'material-ui/svg-icons/file/folder'

import Dropzone from 'react-dropzone'

const FILE_FIELD_NAME = 'files'

const dropzoneStyles = {
  rejected: {
    borderStyle: 'solid',
    borderColor: '#e15258',
    backgroundColor: '#eee',
  },
  disabled: {
    opacity: 0.5,
  },
  active: {
    borderStyle: 'solid',
    borderColor: '#28cb75',
    backgroundColor: '#eee',
  },
  default: {
    width: '100%',
    height: 300,
    borderRadius: 5,
    borderStyle: 'solid',
    borderColor: '#c0c4c6',
  },
}

const iconStyles = {
  margin: 'auto',
  height: '64px',
  width: '64px',
  color: '#4c5760',
}

const renderDropzoneInput = field => {
  const [ file ] = field.input.value
  return (
    <div>
      <Dropzone
        accept="application/vnd.ms-excel"
        name={ field.name }
        onDrop={ field.input.onChange }
        style={ dropzoneStyles.default }
        activeStyle={ dropzoneStyles.active }
        rejectStyle={ dropzoneStyles.rejected }
      >
        <div className={ styles.filegroupicon }>
          <Folder style={ iconStyles } />
        </div>
        { !file && <h2>Drag and drop a CSV, or click here to browse</h2> }
        <h2>{ file && file.name }</h2>
      </Dropzone>
      { field.meta.touched &&
        field.meta.error && <span className="error">{ field.meta.error }</span> }
    </div>
  )
}

class AddCsv extends Component {
  constructor(props) {
    super(props)

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  handleFormSubmit(formProps) {
    const file = formProps.files[0]
    if (file) {
      this.props.sendEntryCsv(file)
    } else {
      console.log('no file found' + formProps)
    }
  }

  onChange() {}

  render() {
    const { handleSubmit, reset } = this.props

    return (
      <div className={ styles.formcontainer }>
        <form onSubmit={ handleSubmit(this.handleFormSubmit) }>
          <Field
            name={ FILE_FIELD_NAME }
            component={ renderDropzoneInput }
            onChange={ this.onChange }
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

          { /* Reset button */ }
          <button onClick={ reset } className={ styles.altbtn }>
            Clear
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
