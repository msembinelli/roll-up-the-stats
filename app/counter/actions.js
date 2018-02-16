import { makeActionCreators } from 'redux-standard-actions'

export const { increment, decrement, reset, changeStep } = makeActionCreators(
  'INCREMENT',
  'DECREMENT',
  'RESET',
  'CHANGE_STEP'
)
