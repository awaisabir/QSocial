import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, Redirect } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../actions/index';

import LoginComponent from '../components/Login';
import RegisterComponent from '../components/Register';
import HomeComponent from '../components/Home';
import ProfileComponent from '../components/Profile';
import'../styles/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  render() {
    let { fetched, success } = this.props;
    return (
      <div>
        <Router>
          <div>
            <Menu secondary>
              <Menu.Item><NavLink to="/home"><Menu.Item name='Home'/></NavLink></Menu.Item>
              <Menu.Menu position='right'>
                {fetched && success ? 
                  null : 
                  <Menu.Item><NavLink to="/register"><Menu.Item name='Register'/></NavLink></Menu.Item>
                }
                {fetched && success ? 
                  null : 
                  <Menu.Item><NavLink to="/login"><Menu.Item name='Login'/></NavLink></Menu.Item>
                }
                {fetched && success ? 
                  <Menu.Item><NavLink to="/profile"><Menu.Item name='Profile'/></NavLink></Menu.Item> 
                  : null
                }
                {fetched && success ? 
                  <Menu.Item onClick={this.logout}>Logout</Menu.Item> 
                  : null
                }
              </Menu.Menu>
            </Menu>

            <div>
              <Route exact path="/home" component={HomeComponent} />
              <Route exact path="/login" component={LoginComponent} />
              <Route exact path="/register" component={RegisterComponent} />
              <Route exact path="/profile" component={ProfileComponent} />
              <Route exact path="/" render={() => (
                  <Redirect to="/home"/>
              )}/>
            </div>
          </div>
        </Router>
      </div>
    );
  };

  logout() {
    localStorage.removeItem('token');
    this.props.logout();
  };
}

const mapStateToProps = ({authenticationReducer}) => authenticationReducer;
const mapDispatchToProps = dispatch => bindActionCreators({logout}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
