import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, Redirect, browserHistory } from 'react-router'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { Provider } from 'react-redux'

import Chrome from './components/chrome'
import Login from './components/auth/login'
import SignUp from './components/auth/signup'
import Home from './components/home'

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
      <Router history={ browserHistory }>
        <Route path='/'
               component={ Chrome }>
          <IndexRoute component={ Home } />
          <Route path='login'
                 component={ Login } />
          <Route path='signup'
                 component={ SignUp } />
          <Redirect from="*"
                    to='/' />
        </Route>
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('react-root')
)
