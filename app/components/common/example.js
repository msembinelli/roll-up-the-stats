import React, { PropTypes } from 'react'

export default function ExampleComponent({ headingText = 'Dummy Route', route }) {
  return (
    <div>
      <h3>{ headingText }</h3>
      { route.content || 'Default Dummy Route Content' }
    </div>
  )
}

ExampleComponent.propTypes = {
  headingText: PropTypes.string,
  route: PropTypes.object,
}
