import React, { Component } from 'react';
import { Item } from 'semantic-ui-react';

import PostItem from './PostItem';
import '../../styles/Post.css';


export default class PostsList extends Component {
  render() {
    return (
      <Item.Group>
        {this.props.posts.map(post => (
          <PostItem key={post._id} post={post}/>
        ))}
      </Item.Group>
    );
  }
}