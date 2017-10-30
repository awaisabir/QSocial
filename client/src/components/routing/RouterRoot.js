import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import Login from '../Login';
import Register from '../Register';
import Posts from '../../containers/PostsContainer';
import Profile from '../user/Profile';

export default ({updateIsAuthed, user, isAuthed}) => (
  <div>
    <Switch>
      <Route path="/posts" component={Posts} />
      {isAuthed ? <Route path="/login" render={() => <Redirect to="/profile" />} /> 
        : <Route path="/login" render={props => <Login updateIsAuthed={updateIsAuthed} {...props}/>} />
      }

      {isAuthed ? <Route path="/register" render={() => <Redirect to="/profile" />} /> 
        : <Route path="/register" component={Register} />} />
      }

      <PrivateRoute 
        authed={isAuthed} 
        path='/profile' 
        render={props => <Profile user={user} />} 
      />

      <Route exact path="/" render={() => (
          <Redirect to="/posts"/>
      )}/>
    </Switch>
  </div>
);