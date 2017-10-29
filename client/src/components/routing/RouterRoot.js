import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import LoginComponent from '../Login';
import RegisterComponent from '../Register';
import HomeComponent from '../Home';
import ProfileComponent from '../user/Profile';

export default ({updateIsAuthed, user, isAuthed}) => (
  <div>
    <Switch>
      <Route path="/home" component={HomeComponent} />
      {isAuthed ? <Route path="/login" render={() => <Redirect to="/profile" />} /> 
        : <Route path="/login" render={props => <LoginComponent updateIsAuthed={updateIsAuthed} {...props}/>} />
      }

      {isAuthed ? <Route path="/register" render={() => <Redirect to="/profile" />} /> 
        : <Route path="/register" component={RegisterComponent} />} />
      }

      <PrivateRoute 
        authed={isAuthed} 
        path='/profile' 
        render={props => <ProfileComponent user={user} />} 
      />

      <Route exact path="/" render={() => (
          <Redirect to="/home"/>
      )}/>
    </Switch>
  </div>
);