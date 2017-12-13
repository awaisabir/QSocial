import React from 'react';
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
    <Button icon="chevron left" content="All Posts" onClick={() => history.push('/posts?heading=&page=1&order=desc')}/>
  </div>
);