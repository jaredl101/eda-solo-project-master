import React, { Component } from 'react';
import { connect } from 'react-redux';

//

import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import DeleteIcon from '@material-ui/icons/Delete';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';


class Workout extends Component {
  // This is our workout component, it will keep track of all the exercises we've submited to the database

  componentDidMount() {
    // Load the history when this page is loaded
    this.props.dispatch({ type: 'FETCH_HISTORY', payload: { id: this.props.user.id } });
  }

  deleteSet = (toDelete) => {
    // This function will delete a set based on it's setId
    this.props.dispatch({ type: 'DELETE_SET', payload: { id: toDelete, user_id: this.props.user.id} });
  }
  render() {
    return (
      <>
        {this.props.history.length === 0 ? <p>Add some exercises to begin tracking!</p> :

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align='center'>Name</TableCell>
                  <TableCell align='center'>Date</TableCell>
                  <TableCell align='center'>Exercise Name</TableCell>
                  <TableCell align='center'>Set</TableCell>
                  <TableCell align='center'>Rep</TableCell>
                  <TableCell align='center'>Weight</TableCell>
                  <TableCell align='center'>Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {this.props.history.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell align='center'>{this.props.user.username}</TableCell>
                    <TableCell align='center'>{moment(item.date).format("MMM Do YYYY")}</TableCell>
                    <TableCell align='center'>{item.exercise_name}</TableCell>
                    <TableCell align='center'>{item.set_number}</TableCell>
                    <TableCell align='center'>{item.rep}</TableCell>
                    <TableCell align='center'>{item.weight}lbs</TableCell>
                    <TableCell align='center'><Button onClick={() => this.deleteSet(item.set_id)} variant="contained" color="secondary"><DeleteIcon />delete</Button></TableCell>
                  </TableRow>
                ))
                }
              </TableBody>

            </Table>
          </TableContainer>
        }
        <br />
        <br />
        <br />
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    exercise: state.exercise,
    set: state.set,
    history: state.history,
  }
}

export default connect(mapStateToProps)(Workout);