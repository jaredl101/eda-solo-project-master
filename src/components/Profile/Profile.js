import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import './Profile.css';
import { TextField, Button } from '@material-ui/core';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class Profile extends Component {
  state = {
    editMode: false,
    newAvatar: '',
    weight: [],
    currentWeight: '',
    updateWeightMode: false,
  }

  handleChange = (propertyName, event) => {
    // Updates our local state when input is changed
    this.setState({
      [propertyName]: event.target.value
    })
  }

  onError = () => {
    this.props.dispatch({ type: 'UPDATE_AVATAR', payload: { id: this.props.user.id, newAvatar: 'images/default.png' } })
    this.setState({ editMode: false });
  }

  updateAvatar = () => {
    this.props.dispatch({ type: 'UPDATE_AVATAR', payload: { id: this.props.user.id, newAvatar: this.state.newAvatar } })
    this.setState({ editMode: false });
  }

  updateWeight = () => {
    this.setState({ })
  }
  render() {

    return (
      <div>
        {
          this.state.editMode === true ?
            <form onSubmit={this.updateAvatar}>
              <TextField
                type="text"
                required
                //placeholder="New Title"
                label="Avatar URL"
                onChange={(event) => this.handleChange('newAvatar', event)}
              />
              <Button onClick={this.updateAvatar} variant="contained" color="primary" size="small" type="Submit">Update</Button>
            </form>

            :
            <div>
              <button onClick={() => this.setState({ editMode: !this.state.editMode })}>Edit Profile</button>
              <br />
              <br />
              <img id="avatar" onError={this.onError} src={this.props.user.avatar} alt="avatar" />
              <br />
              <p>Name: {this.props.user.first_name} {this.props.user.last_name}</p>
              <p>Username: {this.props.user.username}</p>
              <p>Account Created: {moment(this.props.user.date_created).subtract(10, 'days').calendar()}</p>


              {this.state.currentWeight === '' ?

                  <p id="noWeight"><span>Please update your weight to begin tracking it!</span></p>
                :
                <p>Current Weight: {this.state.currentWeight}</p>
              }
              
            </div>
        }
      </div>

    )

  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    exercise: state.exercise,
  }
}

export default connect(mapStateToProps)(Profile);
