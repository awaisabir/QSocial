import React, { Component } from 'react';
import { Header, Container } from 'semantic-ui-react';

import PostsList from '../components/posts/PostsList';
import PostsPagination from '../components/posts/PostsPagination';

export default class PostsContainer extends Component {
  render() {
    return (
      <Container>
        <Header as='h2'>PostsContainer</Header>
        <PostsList />
        <PostsPagination />
      </Container>
    );
  }
}