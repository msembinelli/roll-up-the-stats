import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import Code from 'material-ui/svg-icons/action/code'
import { blue500 } from 'material-ui/styles/colors'
import styles from '../../styles/footer.scss'

const style = {
  margin: 12,
}

function Footer() {
  return (
    <footer className={ styles.footer }>
      <FlatButton
        href="https://github.com/msembinelli/roll-up-the-stats"
        target="_blank"
        secondary={ true }
        icon={ <Code color="#455A64" hoverColor={ blue500 } /> }
        style={ style }
        primary={ true }
        label="Fork me on github"
      />
    </footer>
  )
}

export default Footer
