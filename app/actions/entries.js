import axios from 'axios'
import { browserHistory } from 'react-router'
import { API_URL } from '../config'
import {
  FETCH_ENTRIES,
  FETCH_USER_ENTRIES,
  ENTRY_SUCCESS,
  ENTRY_CSV_SUCCESS,
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
  return function(dispatch) {
    axios.get(API_URL).then(response => {
      dispatch({
        type: FETCH_ENTRIES,
        payload: response.data,
      })
    })
  }
}

/**
 * Fetch all tims entries
 */
export function fetchUserEntries() {
  const user = JSON.parse(localStorage.getItem('user'))
  return function(dispatch) {
    axios
      .get(`${API_URL}/user`, {
        headers: { authorization: user.token },
        params: {
          email: user.email,
        },
      })
      .then(response => {
        dispatch({
          type: FETCH_USER_ENTRIES,
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

  return function(dispatch) {
    axios
      .post(`${API_URL}/new`, props, { headers: { authorization: user.token } })
      .then(() => {
        dispatch({ type: ENTRY_SUCCESS })

        browserHistory.push('/user')
      })
      .catch(error =>
        dispatch(entryError(ENTRY_FAILURE, error.response.data.error))
      )
  }
}

/**
 * Send entries as CSV file
 */
export function sendEntryCsv(file) {
  const user = JSON.parse(localStorage.getItem('user'))

  var body = new FormData()
  body.append('file', file)

  const config = {
    headers: {
      authorization: user.token,
    },
  }

  return function(dispatch) {
    axios
      .post(`${API_URL}/new/csv`, body, config)
      .then(() => {
        dispatch({ type: ENTRY_CSV_SUCCESS })

        browserHistory.push('/user')
      })
      .catch(error =>
        dispatch(entryError(ENTRY_FAILURE, error.response.data.error))
      )
  }
}
