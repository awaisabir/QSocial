import React, { Component } from 'react';
import { Header, Container } from 'semantic-ui-react';

export default class PostsPagination extends Component {
  render() {
    return (
      <Container style={{display: 'flex', justifyContent: 'center'}}>
        <Header as='h2'>Post Pagination</Header>
      </Container>
    );
  }
}