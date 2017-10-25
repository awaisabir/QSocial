import React, { Component } from 'react';
import { Container, Grid, Header } from 'semantic-ui-react';
import ProfileComponent from '../components/user/Profile';
import { Redirect } from 'react-router-dom';
import decode from 'jwt-decode';

import '../styles/Profile.css';

class ProfileContainer extends Component {
  render() {
    let token = localStorage.getItem('token');

    if (!token || token == 'undefined') {
      return <Redirect to="/login" />;
    } else {
      try {
        let { exp } = decode(token);
  
        if (exp < new Date().getTime() / 1000)
          return <Redirect to="/login" />;

        let user = decode(token);
        return (
          <Container className="profile" style={{display:'flex', flexDirection:'column'}}>
            <Grid columns={1} centered>
              <Grid.Row>
                <ProfileComponent user={user}/><br/>
              </Grid.Row>
            </Grid>
            <Grid columns={2} divided>
              <Grid.Column>
                <Header as='h2'>Your Posts</Header>
              </Grid.Column>
              <Grid.Column>
                <Header as='h2'>Your Recent Activity</Header>
              </Grid.Column>
            </Grid>
          </Container>
        );
      } catch(err) {
        return <Redirect to="/login" />;
      }
    }
  }
};

export default ProfileContainer;