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
// import Card from 'material-ui/Card'

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = { timer: null }
  }

  componentWillMount() {
    this.props.fetchEntries()
    this.setState({ timer: setInterval(this.props.fetchEntries.bind(this), 5000) })
  }

  componentWillUnmount() {
    setInterval(this.state.timer)
  }

  renderTableRow(entry) {
    return (
      <TableRow key={ entry.id }>
        <TableRowColumn>{ `${entry.firstname} ${entry.lastname}` }</TableRowColumn>
        <TableRowColumn>{ new Date(entry.date).toLocaleDateString() }</TableRowColumn>
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
      return (
        <div>Loading...</div>
      )
    }

    return (
      <div>
        <div>
          <Table>
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
              { entryList.slice(0).reverse().map(this.renderTableRow) }
            </TableBody>
          </Table>
        </div>
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