import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../actions/index';

import NavbarComponent from '../components/Navbar';
import RouterRoot from './Root';
import'../styles/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.state = {logoutSelected: false};
  }

  render() {
    if (this.state.loggedOut) {
      return <Redirect to="/login" />;
    }

    return (
      <Router>
        <div>
          <NavbarComponent logout={this.logout} />
          <Route path="/" component={RouterRoot} />
        </div>
      </Router>
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.props.logout();
    this.setState({logoutSelected: true});
  }
}

const mapStateToProps = ({authenticationReducer}) => authenticationReducer;
const mapDispatchToProps = dispatch => bindActionCreators({logout}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
