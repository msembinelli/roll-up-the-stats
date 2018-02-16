import React, { Component, PropTypes } from 'react'
import TextField from 'material-ui/TextField'
import { changeStep } from './actions'
import { selectors } from './reducers'
import { connect } from 'react-redux'
import { toNumber, inRange } from 'lodash'

const STEP_MIN = 1
const STEP_MAX = 100

@connect(
  state => ({ step: selectors.getStep(state) }),
  { changeStep },
)
export default class StepSetter extends Component {
  static propTypes = {
    changeStep: PropTypes.func.isRequired,
    step: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = { errorText: null }
  }

  changeStep = event => {
    const step = toNumber(event.target.value)
    let errorText
    if (inRange(step, STEP_MIN, STEP_MAX + STEP_MIN)) {
      this.props.changeStep(step)
      errorText = null
    } else {
      errorText = `Type a number between ${STEP_MIN} and ${STEP_MAX}`
    }
    this.setState({ errorText })
  }

  render() {
    return <TextField
      type='number'
      onChange={ this.changeStep }
      floatingLabelText='Set increment/decrement step'
      min={ STEP_MIN }
      max={ STEP_MAX }
      value={ this.props.step }
      errorText={ this.state.errorText }
      required />
  }
}
