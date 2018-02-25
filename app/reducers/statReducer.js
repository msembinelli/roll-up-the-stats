import { FETCH_STATS, FETCH_USER_STATS } from '../actions/types'

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_STATS:
      return { ...state, statsList: action.payload }
    case FETCH_USER_STATS:
      return { ...state, userStatsList: action.payload }
  }

  return state
}
