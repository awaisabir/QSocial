import React from 'react';
import { Container, Grid, Header } from 'semantic-ui-react';
import ProfileCardComponent from '../user/ProfileCard';

import '../../styles/Profile.css';

export default ({user}) => (
  <Container className="profile" style={{display:'flex', flexDirection:'column'}}>
    <Grid columns={1} centered>
      <Grid.Row>
        <ProfileCardComponent user={user} /><br/>
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