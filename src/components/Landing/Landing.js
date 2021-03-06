import React, { Component } from 'react';
import { withRouter} from "react-router";
import { Button } from '@material-ui/core';
// import barbell1 from '/images/barbell1.jpg';
// import { urlencoded } from 'express';
// import barbell1 from '*.jpg'
// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class Landing extends Component {

  begin = () => { this.props.history.push('/home')}
  render() {
    
    return (
      <div>
        {/* <p>This webapp is a fitness tracker. This application will allow you to add new workouts, and view previous workouts.</p> */}
        {/* <h1>Welcome to Venonis Fitness Tracker</h1> */}
        <img src='images/barbell1.jpg' alt='Example'
        width='600'
        height='400'
        />
    

     
        <br />
        <Button variant="contained" color="secondary" size="medium" type="submit" onClick={this.begin}>Begin</Button>
      </div>
    )
  }
}  


export default withRouter(Landing);
