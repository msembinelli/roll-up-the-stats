import axios from 'axios'
import { API_URL } from '../config'
import { FETCH_STATS, FETCH_USER_STATS } from './types/index'

/**
 * Error helper
 */
export function statsError(CONST, error) {
  return {
    type: CONST,
    payload: error,
  }
}

/**
 * Fetch all tims stats
 */
export function fetchStats() {
  return function(dispatch) {
    axios.get(`${API_URL}/stats`).then(response => {
      dispatch({
        type: FETCH_STATS,
        payload: response.data,
      })
    })
  }
}

/**
 * Fetch all tims stats
 */
export function fetchUserStats() {
  const user = JSON.parse(localStorage.getItem('user'))
  return function(dispatch) {
    axios
      .get(`${API_URL}/user/stats`, {
        headers: { authorization: user.token },
        params: {
          email: user.email,
        },
      })
      .then(response => {
        dispatch({
          type: FETCH_USER_STATS,
          payload: response.data,
        })
      })
  }
}
