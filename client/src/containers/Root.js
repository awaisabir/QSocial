import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import LoginComponent from '../components/Login';
import RegisterComponent from '../components/Register';
import HomeComponent from '../components/Home';
import ProfileContainer from '../containers/ProfileContainer';

export default class RootComponent extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/home" component={HomeComponent} />
          <Route exact path="/login" component={LoginComponent} />
          <Route exact path="/register" component={RegisterComponent} />
          <Route path="/profile" component={ProfileContainer} />
          <Route exact path="/" render={() => (
              <Redirect to="/home"/>
          )}/>
        </Switch>
      </div>
    );
  }
}