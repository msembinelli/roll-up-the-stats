import React, { PropTypes } from 'react'

export default function BlankTargetLink({ to, children }) {
  return <a href={ to }
            target='_blank'
            rel='noopener noreferrer'>
    { children }
  </a>
}

BlankTargetLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}
