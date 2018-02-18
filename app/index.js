import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { Provider } from 'react-redux'

import allRoutes from './routes'

import configureStore from './store'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

// http://www.material-ui.com/#/customization/themes
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#455A64',
  },
})

ReactDOM.render(
  <MuiThemeProvider muiTheme={ muiTheme }>
    <Provider store={ configureStore() }>
      <Router history={ browserHistory } routes={ allRoutes } />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('react-root')
)
