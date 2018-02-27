import axios from 'axios'
import { browserHistory } from 'react-router'
import { API_URL } from '../config'
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_RESEND_FAILURE,
  VERIFY_EMAIL_ERROR,
  SIGNIN_FAILURE,
  AUTH_USER,
  UNAUTH_USER,
  SET_REDIRECT_URL,
} from './types/index'

/**
 * Error helper
 */
export function authError(CONST, error) {
  return {
    type: CONST,
    payload: error,
  }
}

/**
 * Sign up
 */
export function signupUser(props) {
  return function(dispatch) {
    axios
      .post(`${API_URL}/signup`, props)
      .then(() => {
        dispatch({ type: SIGNUP_SUCCESS })

        browserHistory.push(`/signup/verify-email?email=${props.email}`)
      })
      .catch(error =>
        dispatch(authError(SIGNUP_FAILURE, error.response.data.error))
      )
  }
}

/**
 * Sign in
 */
export function signinUser(props) {
  const { email, password, nextUrlPath } = props

  return function(dispatch) {
    axios
      .post(`${API_URL}/signin`, { email, password })
      .then(response => {
        localStorage.setItem('user', JSON.stringify(response.data))

        dispatch({ type: AUTH_USER })

        browserHistory.push(nextUrlPath)
      })
      .catch(() =>
        dispatch(authError(SIGNIN_FAILURE, "Email or password isn't right"))
      )
  }
}

/**
 * Resend verification code
 */
export function resendVerification(props) {
  return function(dispatch) {
    axios
      .post(`${API_URL}/resend-verify-code`, props)
      .then(() => {
        dispatch({ type: SIGNUP_SUCCESS })
      })
      .catch(error =>
        dispatch(authError(SIGNUP_RESEND_FAILURE, error.response.data.error))
      )
  }
}

/**
 * Verify email
 */
export function verifyEmail(props) {
  return function(dispatch) {
    axios
      .post(`${API_URL}/signup/verify-email`, props)
      .then(response => {
        localStorage.setItem('user', JSON.stringify(response.data))

        browserHistory.push(`/verified?email=${props.email}`)
      })
      .catch(error =>
        dispatch(authError(VERIFY_EMAIL_ERROR, error.response.data.error))
      )
  }
}

/**
 * Set redirect URL after signin
 */
export function setRedirectUrl(url) {
  return {
    type: SET_REDIRECT_URL,
    payload: url,
  }
}

/**
 * Sign out
 */
export function signoutUser() {
  localStorage.clear()

  return {
    type: UNAUTH_USER,
  }
}
