import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'

import Chrome from './components/chrome'
import Signin from './components/auth/Signin'
import Signout from './components/auth/Signout'
import Signup from './components/auth/Signup'
import VerifyEmail from './components/auth/VerifyEmail'
import SignupVerify from './components/auth/SignupVerify'
import ResetPassword from './components/resetPassword/ResetPassword'
import ResetPasswordVerify from './components/resetPassword/ResetPasswordVerify'
import ResetPasswordNew from './components/resetPassword/ResetPasswordNew'
import Home from './components/home'
import Add from './components/new/Add'

import requireAuth from './components/hoc/RequireAuth'
import requireNotAuth from './components/hoc/RequireNotAuth'

export default (
  <Route path="/" component={ Chrome }>
    <IndexRoute component={ Home } />
    <Route path="signin" component={ requireNotAuth(Signin) } />
    <Route path="signup" component={ requireNotAuth(Signup) } />
    <Route path="signout" component={ Signout } />
    <Route path="signup/verify-email" component={ requireNotAuth(SignupVerify) } />
    <Route path="verify-email" component={ requireNotAuth(VerifyEmail) } />
    <Route path="reset-password" component={ requireNotAuth(ResetPassword) } />
    <Route path="reset-password/verify" component={ ResetPasswordVerify } />
    <Route path="reset-password/new" component={ requireNotAuth(ResetPasswordNew) } />
    <Route path="new" component={ requireAuth(Add) } />
    <Redirect from="*" to='/' />
    { /* <Route path="users" component={requireAuth(UserList)} /> */ }
  </Route>
)
