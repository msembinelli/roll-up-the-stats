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
  }

  componentWillMount() {
    this.props.fetchEntries()
  }

  render() {
    const { entryList } = this.props
    console.log(entryList)
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
              <TableRow>
                <TableRowColumn>John Smith</TableRowColumn>
                <TableRowColumn>February 15</TableRowColumn>
                <TableRowColumn>Large</TableRowColumn>
                <TableRowColumn>No</TableRowColumn>
                <TableRowColumn>None</TableRowColumn>
                <TableRowColumn>None</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Randal White</TableRowColumn>
                <TableRowColumn>February 15</TableRowColumn>
                <TableRowColumn>Small</TableRowColumn>
                <TableRowColumn>Yes</TableRowColumn>
                <TableRowColumn>Coffee</TableRowColumn>
                <TableRowColumn>YES!</TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ entryList }) {
  return { entryList }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchEntries }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)