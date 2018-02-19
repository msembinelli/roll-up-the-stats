import {
  FETCH_ENTRIES,
  ENTRY_SUCCESS,
  ENTRY_FAILURE,
} from '../actions/types'

export default function(state = {}, action) {
  switch(action.type) {
    case FETCH_ENTRIES:
      return { entryList: action.payload, ...state }
    case ENTRY_SUCCESS:
      return { ...state, error: {} }
    case ENTRY_FAILURE:
      return { ...state, error: { entry: action.payload } }
  }

  return state
}