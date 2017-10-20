import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../actions/index';

import NavbarComponent from '../components/Navbar';
import LoginComponent from '../components/Login';
import RegisterComponent from '../components/Register';
import HomeComponent from '../components/Home';
import ProfileContainer from '../containers/ProfileContainer';
import'../styles/App.css';

class App extends Component {
  componentDidUpdate() {
    // check token and pass props to navbar
  }

  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.state = {logoutSelected: false};
  }

  render() {
    let { fetched, success } = this.props;

    if (this.state.loggedOut) {
      <Redirect to="/login" />
    }

    return (
      <div>
        <Router>
          <div>
            <NavbarComponent logout={this.logout} />
            <div>
              <Route exact path="/home" component={HomeComponent} />
              <Route exact path="/login" component={LoginComponent} />
              <Route exact path="/register" component={RegisterComponent} />
              <Route exact path="/profile" component={ProfileContainer} />
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
    this.setState({logoutSelected: true});
  };
}

const mapStateToProps = ({authenticationReducer}) => authenticationReducer;
const mapDispatchToProps = dispatch => bindActionCreators({logout}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
