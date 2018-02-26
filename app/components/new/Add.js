import 'react-widgets/dist/css/react-widgets.css'
import styles from '../../styles/bundle.scss'

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import Globalize from 'globalize'
import globalizeLocalizer from 'react-widgets-globalize'
import DropdownList from 'react-widgets/lib/DropdownList'
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import { sendEntry } from '../../actions/entries'
import { connect } from 'react-redux'
import { sizes, wins, prizes, purchased, appPrizes } from './types/index'

Globalize.locale('en')
globalizeLocalizer()

let formatter = Globalize.dateFormatter({
  date: 'short',
  timezone: 'America/Edmonton', //TODO: Make this dynamic
})

const renderDropdownList = ({
  input,
  data,
  placeholder,
  meta: { touched, error },
}) => (
  <div
    className={ `${styles.inputgroup} ${
      touched && error ? styles.haserror : ''
    }` }
  >
    <h4>{ placeholder }</h4>
    <DropdownList { ...input } data={ data } onChange={ input.onChange } />
    { touched && error && <div className={ styles.formerror }>{ error }</div> }
  </div>
)

const renderDateTimePicker = ({
  input: { value, onChange },
  placeholder,
  meta: { touched, error },
}) => (
  <div
    className={ `${styles.inputoverride} ${styles.inputgroup} ${
      touched && error ? styles.haserror : ''
    }` }
  >
    <h4>{ placeholder }</h4>
    <DateTimePicker
      onChange={ onChange }
      editFormat={ formatter }
      time={ false }
      value={ !value ? null : new Date(value) }
    />
    { touched && error && <div className={ styles.formerror }>{ error }</div> }
  </div>
)

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

class Add extends Component {
  constructor(props) {
    super(props)

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.renderPrize = this.renderPrize.bind(this)
  }

  handleFormSubmit(formProps) {
    this.props.sendEntry(formProps)
  }

  renderPrize(formProps) {
    this.props.win(formProps)
  }

  render() {
    const { handleSubmit, isWin } = this.props

    return (
      <div className={ styles.formcontainer }>
        <h2>Record your win (or loss..)</h2>
        <form onSubmit={ handleSubmit(this.handleFormSubmit) }>
          { /* Date */ }
          <Field
            name="date"
            component={ renderDateTimePicker }
            type="date"
            placeholder="Date"
          />

          { /* Size */ }
          <Field
            name="size"
            component={ renderDropdownList }
            data={ sizes }
            type="text"
            placeholder="Size"
          />

          { /* Purchased */ }
          <Field
            name="purchased"
            component={ renderDropdownList }
            data={ purchased }
            type="text"
            placeholder="Purchased?"
          />

          { /* Win */ }
          <Field
            name="win"
            component={ renderDropdownList }
            data={ wins }
            type="text"
            placeholder="Win?"
          />

          { /* Prize */ }
          { isWin === 'Yes' ? (
            <span>
              <Field
                name="prize"
                component={ renderDropdownList }
                data={ prizes }
                type="text"
                placeholder="Prize"
              />
              <Field
                name="appPrize"
                component={ renderDropdownList }
                data={ appPrizes }
                type="text"
                placeholder="App Prize"
              />
            </span>
          ) : null }

          { /* Comment */ }
          <Field
            name="comment"
            component={ renderField }
            type="text"
            placeholder="Comment"
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
            Add
          </button>

          { /* CSV button */ }
          <div className={ styles.formbottom }>
            <p>Want to upload a CSV instead?</p>
            <Link to="/new/csv">Click here</Link>
          </div>
        </form>
      </div>
    )
  }
}

const validate = props => {
  const errors = {}
  const fields = [ 'date', 'size', 'purchased', 'win' ]

  fields.forEach(f => {
    if (!(f in props)) {
      errors[f] = `${f} is required`
    }
  })

  if (!props.comment) {
    props.comment = ''
  }

  if (!props.prize) {
    props.prize = ''
  }

  if (!props.appPrize) {
    props.appPrize = ''
  }

  if (props.comment && props.comment.length > 144) {
    errors.comment = 'max of 144 characters'
  }

  return errors
}

const selector = formValueSelector('add')

function mapStateToProps(state) {
  return { errorMessage: state.auth.error, isWin: selector(state, 'win') }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ sendEntry }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ form: 'add', validate })(Add)
)
