import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchEntries } from '../../actions/entries'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import Up from 'material-ui/svg-icons/action/trending-up'
import Paper from 'material-ui/Paper'
import Footer from '../chrome/footer'
import styles from '../../styles/home.scss'

const iconStyle = {
  marginTop: 24,
}

const paperStyle = {
  height: 180,
  width: 180,
  margin: 10,
  textAlign: 'center',
  display: 'inline-block',
}

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = { timer: null }
  }

  componentWillMount() {
    this.props.fetchEntries()
    this.setState({
      timer: setInterval(this.props.fetchEntries.bind(this), 5000),
    })
  }

  componentWillUnmount() {
    setInterval(this.state.timer)
  }

  renderTableRow(entry) {
    return (
      <TableRow key={ entry.id }>
        <TableRowColumn>{ `${entry.firstname} ${
          entry.lastname
        }` }</TableRowColumn>
        <TableRowColumn>
          { new Date(entry.date).toLocaleDateString() }
        </TableRowColumn>
        <TableRowColumn>{ entry.size }</TableRowColumn>
        <TableRowColumn>{ entry.win }</TableRowColumn>
        <TableRowColumn>{ entry.prize }</TableRowColumn>
        <TableRowColumn>{ entry.comment }</TableRowColumn>
      </TableRow>
    )
  }

  render() {
    const { entryList } = this.props

    if (!entryList) {
      return <div>Loading...</div>
    }
    const wins = entryList.filter(entry => {
      return entry.win === 'Yes'
    })

    // Beware really crappy code...has to be a better way to do this (probably use a database fetch)
    // Most common winning sizes
    const sizeSmall = entryList.filter(entry => {
      if (entry.win === 'Yes') {
        return entry.size === 'S'
      }
    })

    const sizeMedium = entryList.filter(entry => {
      if (entry.win === 'Yes') {
        return entry.size === 'M'
      }
    })

    const sizeLarge = entryList.filter(entry => {
      if (entry.win === 'Yes') {
        return entry.size === 'L'
      }
    })

    const sizeXLarge = entryList.filter(entry => {
      if (entry.win === 'Yes') {
        return entry.size === 'XL'
      }
    })

    const sizeApp = entryList.filter(entry => {
      if (entry.win === 'Yes') {
        return entry.size === 'App'
      }
    })

    const sizeWins = [
      { size: 'S', wins: sizeSmall.length },
      { size: 'M', wins: sizeMedium.length },
      { size: 'L', wins: sizeLarge.length },
      { size: 'XL', wins: sizeXLarge.length },
      { size: 'App', wins: sizeApp.length },
    ]

    const mostWins = sizeWins.reduce(
      (max, p) => (p.wins > max ? p.wins : max),
      sizeWins[0].wins
    )
    let sizeslabel = ''
    sizeWins.filter(entry => {
      if (entry.wins === mostWins) {
        if (entry.size) {
          sizeslabel += entry.size + ', '
        }
      }
    })

    // Most purchases
    // const topPurchaser = entryList.filter( entry => {
    //   if ( entry.win === 'Yes') {
    //     return entry.size === 'App'
    //   }
    // })

    const totalWinsText = `${wins.length}`
    const winRate = `${(wins.length / entryList.length).toFixed(2)}`
    const mostCommonWinningSize = `${sizeslabel}`
    const mostPurchases = 'Matt'
    const dollarsSpent = '436.28'
    const daysLeft = '30'

    return (
      <div>
        <div className={ styles.homecontainer }>
          <div className={ styles.stats }>
            <Paper style={ paperStyle }>
              <Up style={ iconStyle } />
              <h4>Total Wins</h4>
              <p>{ totalWinsText }</p>
            </Paper>
            <Paper style={ paperStyle }>
              <Up style={ iconStyle } />
              <h4>Win Rate</h4>
              <p>{ winRate }</p>
            </Paper>
            <Paper style={ paperStyle }>
              <Up style={ iconStyle } />
              <h4>Winning Size</h4>
              <p>{ mostCommonWinningSize }</p>
            </Paper>
            <Paper style={ paperStyle }>
              <Up style={ iconStyle } />
              <h4>Most Purchases</h4>
              <p>{ mostPurchases }</p>
            </Paper>
            <Paper style={ paperStyle }>
              <Up style={ iconStyle } />
              <h4>Dollars Spent</h4>
              <p>{ dollarsSpent }</p>
            </Paper>
            <Paper style={ paperStyle }>
              <Up style={ iconStyle } />
              <h4>Days Left</h4>
              <p>{ daysLeft }</p>
            </Paper>
          </div>
          <div className={ styles.table }>
            <Paper>
              <Table height="450px" fixedHeader={ true }>
                <TableHeader displaySelectAll={ false } adjustForCheckbox={ false }>
                  <TableRow>
                    <TableHeaderColumn>Name</TableHeaderColumn>
                    <TableHeaderColumn>Date</TableHeaderColumn>
                    <TableHeaderColumn>Size</TableHeaderColumn>
                    <TableHeaderColumn>Win</TableHeaderColumn>
                    <TableHeaderColumn>Prize</TableHeaderColumn>
                    <TableHeaderColumn>Comment</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={ false }>
                  { entryList
                    .slice(0)
                    .reverse()
                    .map(this.renderTableRow) }
                </TableBody>
              </Table>
            </Paper>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { entryList: state.entry.entryList }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchEntries }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
