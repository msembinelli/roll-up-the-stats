import React from 'react'
import ActionHome from 'material-ui/svg-icons/action/home'
import AddCircle from 'material-ui/svg-icons/content/add-circle'
import { NavLink } from '../common'
import styles from '../../styles/navbar.scss'

export default function Navbar() {
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
          </ul>
        </div>
      </div>
    </div>
  )
}
