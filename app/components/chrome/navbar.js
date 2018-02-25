import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import ActionHome from 'material-ui/svg-icons/action/home'
import AccountBox from 'material-ui/svg-icons/action/account-box'
import AddBox from 'material-ui/svg-icons/content/add-box'
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app'
import IconButton from 'material-ui/IconButton'
import { blue500 } from 'material-ui/styles/colors'
import styles from '../../styles/navbar.scss'

const iconStyle = {
  height: '38px',
  width: '38px',
}

class Navbar extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {}

  render() {
    const { authenticated } = this.props

    return (
      <div className={ styles.navbar }>
        <div className={ styles.navtitle }>roll up the stats</div>
        <div className={ styles.navmenuleft }>
          <div className={ styles.navlinks }>
            <ul>
              <li>
                <IconButton
                  tooltip="Home"
                  containerElement={ <Link to="/" /> }
                  iconStyle={ iconStyle }
                >
                  <ActionHome color="#455A64" hoverColor={ blue500 } />
                </IconButton>
              </li>
            </ul>
          </div>
        </div>
        <div className={ styles.navmenuright }>
          <div className={ styles.navlinks }>
            <ul>
              <li>
                <IconButton
                  tooltip="Make an entry"
                  containerElement={ <Link to="/new" /> }
                  iconStyle={ iconStyle }
                >
                  <AddBox color="#455A64" hoverColor={ blue500 } />
                </IconButton>
              </li>
              <li>
                <IconButton
                  tooltip="View your stats"
                  containerElement={ <Link to="/user" /> }
                  iconStyle={ iconStyle }
                >
                  <AccountBox color="#455A64" hoverColor={ blue500 } />
                </IconButton>
              </li>
              { authenticated ? (
                <li>
                  <IconButton
                    tooltip="Sign out"
                    containerElement={ <Link to="/signout" /> }
                    iconStyle={ iconStyle }
                  >
                    <ExitToApp color="#455A64" hoverColor={ blue500 } />
                  </IconButton>
                </li>
              ) : null }
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
