import 'react-widgets/dist/css/react-widgets.css'
import styles from '../../styles/bundle.scss'

import React, { Component } from 'react'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import Globalize from 'globalize'
import globalizeLocalizer from 'react-widgets-globalize'
import DropdownList from 'react-widgets/lib/DropdownList'
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import * as actions from '../../actions/auth'
import { connect } from 'react-redux'
import {
  sizes,
  wins,
  prizes,
} from './types/index'

Globalize.locale('en')
globalizeLocalizer()

let formatter = Globalize.dateFormatter({ date: 'short' })

const renderDropdownList = ({ input, data, placeholder, meta: { touched, error } }) =>
  <div className={ `${ styles.inputgroup } ${ touched && error ? styles.haserror : '' }` }>
    <h4>{ placeholder }</h4>
      <DropdownList { ...input }
        data={ data }
        onChange={ input.onChange } />

    {/* <select onChange={ input.onChange }>
      { data.map(element => <option key={ element.id }>{ element }</option>) }
    </select>  */}
    { touched && error && <div className={ styles.formerror }>{ error }</div> }
  </div>

const renderDateTimePicker = ({ placeholder, meta: { touched, error } }) =>
  <div className={ `${ styles.inputgroup } ${ touched && error ? styles.haserror : '' }` }>
    <h4>{ placeholder }</h4>
    <DateTimePicker
      editFormat={ formatter } 
      defaultValue={ new Date() }
      format={ { raw: 'MMM dd, yyyy' } }
      time={ false }
     />
    { touched && error && <div className={ styles.formerror }>{ error }</div> }
  </div>

const renderField = ({ input, type, placeholder, meta: { touched, error } }) => (
  <div className={ `${ styles.inputgroup } ${ touched && error ? styles.haserror : '' }` }>
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

  handleFormSubmit(/*formProps*/) {
    // this.props.signupUser(formProps)
  }

  renderPrize(formProps) {
    console.log(formProps)
    this.props.win(formProps)
  }

  render() {
    const { handleSubmit, isWin } = this.props

    return (
      <div className={ styles.formcontainer }>
        <h2>Record your win (or loss..)</h2>
        <form onSubmit={ handleSubmit(this.handleFormSubmit) }>

          { /* Date */ }
          <Field name="date" component={ renderDateTimePicker } type="date" placeholder="Date" />

          { /* Size */ }
          <Field name="size" component={ renderDropdownList } data={ sizes } type="text" placeholder="Size" />

          { /* Win */ }
          <Field name="win" component={ renderDropdownList } data={ wins } type="text" placeholder="Win" />

          { /* Prize */ }
          { /* { console.log(isWin) } */ }
          { isWin === 'Yes' ? (
            <Field name="prize" component={ renderDropdownList } data={ prizes } type="text" placeholder="Prize" />
          ) : null }

          { /* Comment */ }
          <Field name="comment" component={ renderField } type="text" placeholder="Comment" />

          { /* Server error message */ }
          <div>
            { this.props.errorMessage && this.props.errorMessage.signup &&
                <div className={ styles.errorcontainer }>Oops! { this.props.errorMessage.signup }</div> }
          </div>

          { /* Submit button */ }
          <button type="submit" className={ styles.btn }>Add</button>
        </form>
      </div>
    )
  }
}

const validate = props => {
  const errors = {}
  const fields = [ 'date', 'size', 'win', 'prize', 'comment' ]

  fields.forEach((f) => {
    if(!(f in props)) {
      errors[f] = `${f} is required`
    }
  })

  // if(props.firstname && props.firstname.length < 3) {
  //   errors.firstname = 'minimum of 4 characters'
  // }

  // if(props.firstname && props.firstname.length > 20) {
  //   errors.firstname = 'maximum of 20 characters'
  // }

  // if(props.lastname && props.lastname.length < 3) {
  //   errors.lastname = 'minimum of 4 characters'
  // }

  // if(props.lastname && props.lastname.length > 20) {
  //   errors.lastname = 'maximum of 20 characters'
  // }

  // if(props.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(props.email)) {
  //   errors.email = 'please provide valid email'
  // }

  // if(props.password && props.password.length < 6) {
  //   errors.password = 'minimum 6 characters'
  // }

  // if(props.password !== props.repassword) {
  //   errors.repassword = "passwords doesn't match"
  // }

  return errors
}

const selector = formValueSelector('add')

function mapStateToProps(state) {
  return { errorMessage: state.auth.error, isWin: selector(state, 'win') }
}

export default connect(mapStateToProps, actions)(
  reduxForm({ form: 'add', validate })(Add)
)
