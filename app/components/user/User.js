import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUserEntries } from '../../actions/entries'
import { fetchUserStats } from '../../actions/stats'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import Up from 'material-ui/svg-icons/action/trending-up'
import Money from 'material-ui/svg-icons/editor/attach-money'
import Pie from 'material-ui/svg-icons/editor/pie-chart'
import Paper from 'material-ui/Paper'
import Coffee from 'material-ui/svg-icons/places/free-breakfast'
import Litres from 'material-ui/svg-icons/maps/local-drink'
import Calendar from 'material-ui/svg-icons/action/date-range'
import Footer from '../chrome/footer'
import styles from '../../styles/user.scss'

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

class User extends Component {
  constructor(props) {
    super(props)

    this.state = { timer: null }
  }

  // fetchEntriesAndStats() {
  //   this.props.fetchEntries()
  //   this.props.fetchStats()
  // }

  componentWillMount() {
    this.props.fetchUserEntries()
    this.props.fetchUserStats()
    // this.setState({
    //   timer: setInterval(this.fetchEntriesAndStats.bind(this), 5000),
    // })
  }

  componentWillUnmount() {
    // setInterval(this.state.timer)
  }

  renderTableRow(entry) {
    return (
      <TableRow key={ entry.id }>
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
        <TableRowColumn>{ entry.appPrize }</TableRowColumn>
        <TableRowColumn>{ entry.comment }</TableRowColumn>
      </TableRow>
    )
  }

  render() {
    const { userEntryList, userStatsList } = this.props

    if (!userEntryList || !userStatsList) {
      return <div>Loading...</div>
    }

    const totalWinsText = userStatsList.totalWins
    const [ mostEntriesOneDay ] = userStatsList.mostEntriesOneDay

    const winRate = `${userStatsList.winRate.value.toFixed(2)} (${
      userStatsList.winRate.fractionString
    })`

    const coffeesPastWeek = userStatsList.entriesPastWeek
    const mostCoffeesOneDay = `${mostEntriesOneDay.count} (${new Date(
      mostEntriesOneDay._id.maxDate
    ).toLocaleDateString()})`
    const litresConsumed = userStatsList.litresConsumed.toFixed(2)
    const dollarsSpent = userStatsList.dollarsSpent.toFixed(2)

    return (
      <div>
        <div className={ styles.usercontainer }>
          <div className={ styles.userstats }>
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
              <h4>Coffees Past Week</h4>
              <p>{ coffeesPastWeek }</p>
            </Paper>
            <Paper style={ paperStyle }>
              <Calendar style={ iconStyle } />
              <h4>Most In One Day</h4>
              <p>{ mostCoffeesOneDay }</p>
            </Paper>
            <Paper style={ paperStyle }>
              <Litres style={ iconStyle } />
              <h4>Litres Consumed</h4>
              <p>{ litresConsumed }</p>
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
                    <TableHeaderColumn>App Prize</TableHeaderColumn>
                    <TableHeaderColumn>Comment</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={ false }>
                  { userEntryList
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
  return {
    userEntryList: state.entry.userEntryList,
    userStatsList: state.stats.userStatsList,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchUserEntries, fetchUserStats }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
