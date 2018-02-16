import React from 'react'
import { BlankTargetLink } from 'common'

export default function Home() {
  return (
    <div>
      <h2>Welcome to the React Docker App</h2>
      <p>Libraries used:</p>
      <ul>
        <li><BlankTargetLink to='https://github.com/reactjs/react-router/'>React Router (Redux)</BlankTargetLink></li>
        <li><BlankTargetLink to='https://github.com/reactjs/redux/'>Redux</BlankTargetLink></li>
        <li><BlankTargetLink to='https://github.com/gaearon/redux-thunk'>Redux Thunk</BlankTargetLink></li>
        <li><BlankTargetLink to='https://github.com/acdlite/redux-actions'>Redux Actions</BlankTargetLink></li>
        <li><BlankTargetLink to='https://github.com/reactjs/reselect'>reselect</BlankTargetLink></li>
        <li><BlankTargetLink to='http://www.material-ui.com/'>Material UI</BlankTargetLink></li>
        <li><BlankTargetLink to='http://lodash.com/'>lodash</BlankTargetLink></li>
      </ul>
      <p>Other libraries included but not used:</p>
      <ul>
        <li><BlankTargetLink to='https://github.com/paularmstrong/normalizr'>normalizr</BlankTargetLink></li>
        <li><BlankTargetLink to='https://github.com/matthew-andrews/isomorphic-fetch'>fetch</BlankTargetLink></li>
      </ul>
      <p>Hot-reloading is enabled; edit code in your IDE and watch the app update in real-time.</p>
      <p><strong>Useful References:</strong></p>
      <ul>
        <li><BlankTargetLink to='https://www.youtube.com/watch?v=xsSnOQynTHs'>Hot Reloading With Time Travel</BlankTargetLink></li>
        <li><BlankTargetLink to='https://egghead.io/series/getting-started-with-redux'>Getting Started With Redux</BlankTargetLink></li>
        <li><BlankTargetLink to='https://egghead.io/courses/building-react-applications-with-idiomatic-redux'>Idiomatic Redux</BlankTargetLink></li>
        <li><BlankTargetLink to='https://www.youtube.com/watch?v=VJ38wSFbM3A'>Read the Source - React Redux</BlankTargetLink></li>
      </ul>
    </div>
  )
}
