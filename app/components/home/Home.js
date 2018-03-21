import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchEntries } from '../../actions/entries'
import { fetchStats } from '../../actions/stats'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import Up from 'material-ui/svg-icons/action/trending-up'
import Cart from 'material-ui/svg-icons/action/shopping-cart'
import Flame from 'material-ui/svg-icons/social/whatshot'
import Money from 'material-ui/svg-icons/editor/attach-money'
import Pie from 'material-ui/svg-icons/editor/pie-chart'
import Coffee from 'material-ui/svg-icons/places/free-breakfast'
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

  // fetchEntriesAndStats() {
  //   this.props.fetchEntries()
  //   this.props.fetchStats()
  // }

  componentWillMount() {
    this.props.fetchEntries()
    this.props.fetchStats()
    // this.setState({
    //   timer: setInterval(this.fetchEntriesAndStats.bind(this), 5000),
    // })
  }

  componentWillUnmount() {
    // setInterval(this.state.timer)
  }

  renderTableRow(entry) {
    return (
      <TableRow key={ entry._id }>
        <TableRowColumn>{ `${entry.firstname} ${
          entry.lastname[0]
        }.` }</TableRowColumn>
        <TableRowColumn>
          { new Date(entry.date).toLocaleDateString() }
        </TableRowColumn>
        <TableRowColumn>{ entry.size }</TableRowColumn>
        <TableRowColumn>{ entry.purchased }</TableRowColumn>
        <TableRowColumn>{ entry.win }</TableRowColumn>
        <TableRowColumn>{ entry.prize }</TableRowColumn>
        <TableRowColumn style={ { whiteSpace: 'normal', wordWrap: 'break-word' } }>{ entry.comment }</TableRowColumn>
      </TableRow>
    )
  }

  render() {
    const { entryList, statsList } = this.props

    if (!entryList || !statsList) {
      return <div>Loading...</div>
    }

    const totalWinsText = statsList.totalWins

    let winRate = 'None'
    if (statsList.winRate.value) {
      winRate = `${statsList.winRate.value.toFixed(2)} (${
        statsList.winRate.fractionString
      })`
    }

    const mostCommonWinningSize = `${statsList.winningSizes.map(
      element => ` ${element.size}`
    )} (${statsList.winningSizes[0].wins})`

    const [ statsMostPurchases ] = statsList.mostPurchases
    let mostPurchases = 'None'
    if (statsMostPurchases) {
      mostPurchases = `${statsMostPurchases._id.firstname} ${
        statsMostPurchases._id.lastname[0]
      }. (${statsMostPurchases.count})`
    }

    const [ statsMostWins ] = statsList.mostWins
    let mostWins = 'None'
    if (statsMostWins) {
      mostWins = `${statsMostWins._id.firstname} ${
        statsMostWins._id.lastname[0]
      }. (${statsMostWins.count})`
    }

    const dollarsSpent = statsList.dollarsSpent.toFixed(2)

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
              <Pie style={ iconStyle } />
              <h4>Win Rate</h4>
              <p>{ winRate }</p>
            </Paper>
            <Paper style={ paperStyle }>
              <Coffee style={ iconStyle } />
              <h4>Winning Sizes</h4>
              <p>{ mostCommonWinningSize }</p>
            </Paper>
            <Paper style={ paperStyle }>
              <Cart style={ iconStyle } />
              <h4>Most Purchases</h4>
              <p>{ mostPurchases }</p>
            </Paper>
            <Paper style={ paperStyle }>
              <Flame style={ iconStyle } />
              <h4>Most Wins</h4>
              <p>{ mostWins }</p>
            </Paper>
            <Paper style={ paperStyle }>
              <Money style={ iconStyle } />
              <h4>Dollars Spent</h4>
              <p>{ dollarsSpent }</p>
            </Paper>
          </div>
          <div>
            <Paper>
              <Table height="450px" fixedHeader={ true }>
                <TableHeader displaySelectAll={ false } adjustForCheckbox={ false }>
                  <TableRow>
                    <TableHeaderColumn>Name</TableHeaderColumn>
                    <TableHeaderColumn>Date</TableHeaderColumn>
                    <TableHeaderColumn>Size</TableHeaderColumn>
                    <TableHeaderColumn>Purchased</TableHeaderColumn>
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
  return { entryList: state.entry.entryList, statsList: state.stats.statsList }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchEntries, fetchStats }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
