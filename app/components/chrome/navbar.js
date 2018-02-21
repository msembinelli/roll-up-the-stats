import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import ActionHome from 'material-ui/svg-icons/action/home'
import AddCircle from 'material-ui/svg-icons/content/add-circle'
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app'
import { NavLink } from '../common'
import styles from '../../styles/navbar.scss'

class Navbar extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {}

  render() {
    const { authenticated } = this.props

    return (
      <div className={ styles.navbar }>
        <div className={ styles.navtitle }>
          Roll Up The Stats!
        </div>
        <div className={ styles.navmenuleft }>
          <div className={ styles.navlinks }>
            <ul>
              <li>
                <NavLink
                  to='/'
                  onlyActiveOnIndex>
                  <ActionHome
                    className={ styles.homeIcon }
                    color='#455A64' />
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className={ styles.navmenuright }>
          <div className={ styles.navlinks }>
            <ul>
              <li>
                <NavLink
                  to='/new'
                  onlyActiveOnIndex>
                  <AddCircle
                    className={ styles.homeIcon }
                    color='#455A64' />
                </NavLink>
              </li>
              { authenticated ?
                ( <li>
                    <NavLink
                      to='/signout'
                      onlyActiveOnIndex>
                      <ExitToApp
                        className={ styles.homeIcon }
                        color='#455A64' />
                    </NavLink>
                  </li> ) : null }
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

Navbar.propTypes = { authenticated: PropTypes.bool }

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated }
}

export default connect(mapStateToProps, null)(Navbar)
