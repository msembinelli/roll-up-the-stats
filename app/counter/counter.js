import React, { PropTypes } from 'react'
import styles from './counter.scss'
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'
import { increment, decrement, reset } from './actions'
import { selectors } from './reducers'
import StepSetter from './step-setter'
import AddCircle from 'material-ui/svg-icons/content/add-circle'
import RemoveCircle from 'material-ui/svg-icons/content/remove-circle'
import ResetCircle from 'material-ui/svg-icons/navigation/refresh'

const CounterDescription = ({ text }) => {
  return (
    <p>
      { text }
    </p>
  )
}

const CounterHeader = ({ count, step }) => {
  return (
    <p className={ styles.counterHeading }>
      Count: <strong>{ count }</strong>
      <br />
      Step: <strong>{ step }</strong>
    </p>
  )
}

const CounterButton = ({ onClick, icon }) => {
  return (
    <RaisedButton
      className={ styles.counterButton }
      primary
      onClick={ onClick }
      icon={ icon }
      />
  )
}

const Counter = ({ count, step, onIncrement, onDecrement, onReset }) => {
  return (
    <div>
      <CounterDescription
        text={ "A container component connected to the Redux store with synchronous dispatches." }
        />
      <CounterHeader
        count={ count }
        step={ step }
        />
      <CounterButton
        onClick={ onDecrement }
        icon={ <RemoveCircle /> }
        /> { ' ' }
      <CounterButton
        onClick={ onIncrement }
        icon={ <AddCircle /> }
        /> { ' ' }
      <CounterButton
        onClick={ onReset }
        icon={ <ResetCircle /> }
        />
      <div className={ styles.stepInput }>
        <StepSetter />
      </div>
    </div>
  )
}

Counter.propTypes = {
  count: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    count: selectors.getCount(state),
    step: selectors.getStep(state),
  }),
  dispatch => ({ dispatch }),
  (stateProps, { dispatch }, ownProps) => ({
  ...stateProps,
  ...ownProps,
  onIncrement: () => dispatch(increment(stateProps.step)),
  onDecrement: () => dispatch(decrement(stateProps.step)),
  onReset: () => dispatch(reset()),
}))(Counter)
