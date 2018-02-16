import React from 'react'
import IconMenu from 'material-ui/IconMenu'
import ActionHome from 'material-ui/svg-icons/action/home'
import IconButton from 'material-ui/IconButton/IconButton'
import Avatar from 'material-ui/Avatar'
import { NavLink } from 'common'
import styles from './navbar.scss'

export default function Navbar() {
  return (
    <div className={ styles.navbar }>
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
          <li><NavLink to='/counter'>Counter</NavLink></li>
        </ul>
      </div>
      <div className={ styles.navmenu }>
        <span>Hi!</span>
        <IconMenu
          iconButtonElement={ <IconButton><Avatar src='' className={ styles.navmenuAvatar } /></IconButton> }
          targetOrigin={ { horizontal: 'right', vertical: 'bottom' } }
          anchorOrigin={ { horizontal: 'right', vertical: 'top' } }>
        </IconMenu>
      </div>
    </div>
  )
}
