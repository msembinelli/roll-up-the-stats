import {
  FETCH_ENTRIES,
  FETCH_USER_ENTRIES,
  ENTRY_SUCCESS,
  ENTRY_FAILURE,
  ENTRY_CSV_SUCCESS,
} from '../actions/types'

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_ENTRIES:
      return { ...state, entryList: action.payload }
    case FETCH_USER_ENTRIES:
      return { ...state, userEntryList: action.payload }
    case ENTRY_SUCCESS:
      return { ...state, error: {} }
    case ENTRY_CSV_SUCCESS:
      return { ...state, error: {} }
    case ENTRY_FAILURE:
      return { ...state, error: { entry: action.payload } }
  }

  return state
}
