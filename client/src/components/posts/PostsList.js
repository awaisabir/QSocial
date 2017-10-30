import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';

import PostItem from './PostItem';

export default class PostsList extends Component {
  render() {
    return (
      <div>
        <Header as='h2'>Posts List</Header>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <PostItem />
        </div>
      </div>
    );
  }
}