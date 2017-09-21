import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

import LoginComponent from '../components/Login'
import RegisterComponent from '../components/Register'
import HomeComponent from '../components/Home'
import'../styles/App.css';

class App extends Component {

  render() {
    return (
      <div>
        <Router>
          <div>
            <Menu secondary>
              <NavLink to="/"><Menu.Item name='Home'/></NavLink>
              <Menu.Menu position='right'>
                <NavLink to="/register"><Menu.Item name='Register'/></NavLink>
                <NavLink to="/login"><Menu.Item name='Login'/></NavLink>
              </Menu.Menu>
            </Menu>

            <div>
              <Route exact path="/" component={HomeComponent} />
              <Route exact path="/login" component={LoginComponent} />
              <Route exact path="/register" component={RegisterComponent} />
            </div>
          </div>
        </Router>
      </div>
    )
  }
}

export default App;
