import React, { PropTypes } from 'react'
import Navbar from './navbar'
import styles from './chrome.scss'

export default function Chrome({ children }) {
  return <div>
    <Navbar />
    <div className={ styles.chrome }>
      { children }
    </div>
  </div>
}

Chrome.propTypes = {
  children: PropTypes.node.isRequired,
}
