import React from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
// import Card from 'material-ui/Card'

export default function Home() {
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
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={ false }>
            <TableRow>
              <TableRowColumn>John Smith</TableRowColumn>
              <TableRowColumn>February 15</TableRowColumn>
              <TableRowColumn>Large</TableRowColumn>
              <TableRowColumn>No</TableRowColumn>
              <TableRowColumn>None</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>Randal White</TableRowColumn>
              <TableRowColumn>February 15</TableRowColumn>
              <TableRowColumn>Small</TableRowColumn>
              <TableRowColumn>Yes</TableRowColumn>
              <TableRowColumn>Coffee</TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
