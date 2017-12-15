import React from 'react';
import { NavLink } from 'react-router-dom';
import { Item, Button } from 'semantic-ui-react';

import PostItem from './PostItem';
import '../../styles/Post.css';

export default ({ posts, history }) => (
  <div>
    <Item.Group className="post-list">
      {posts.map(post => (
        <PostItem key={post._id} post={post} history={history} />
      ))}
    </Item.Group>
    <NavLink to="/" style={{backgroundColor : 'white'}}><Button icon="chevron left" content="All Posts" /></NavLink>
  </div>
);