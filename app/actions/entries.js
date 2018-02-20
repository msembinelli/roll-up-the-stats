import axios from 'axios'
import { browserHistory } from 'react-router'
import { API_URL } from '../config'
import {
  FETCH_ENTRIES,
  ENTRY_SUCCESS,
  ENTRY_FAILURE,
} from './types/index'

/**
 * Error helper
 */
export function entryError(CONST, error) {
  return {
    type: CONST,
    payload: error,
  }
}

/**
 * Fetch all tims entries
 */
export function fetchEntries() {
  return function (dispatch) {
    axios.get(API_URL)
      .then(response => {
        dispatch({
          type: FETCH_ENTRIES,
          payload: response.data,
        })
      })
  }
}

/**
 * Make an entry
 */
export function sendEntry(props) {
  const user = JSON.parse(localStorage.getItem('user'))
  props.firstname = user.firstname
  props.lastname = user.lastname
  props.email = user.email
  return function (dispatch) {
    axios.post(`${API_URL}/new`, props, { headers: { authorization: user.token } })
      .then(() => {
        dispatch({ type: ENTRY_SUCCESS })

        browserHistory.push('/')
      })
      .catch(response => dispatch(entryError(ENTRY_FAILURE, response.data.error)))
  }
}
