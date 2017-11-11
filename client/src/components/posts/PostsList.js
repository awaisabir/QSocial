import React from 'react';
import { Item } from 'semantic-ui-react';

import PostItem from './PostItem';
import '../../styles/Post.css';


export default ({ posts, history }) => (
  <Item.Group className="post-list">
    {posts.map(post => (
      <PostItem key={post._id} post={post} history={history} />
    ))}
  </Item.Group>
);