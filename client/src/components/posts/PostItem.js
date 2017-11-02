import React from 'react';
import { Header, Item, Icon } from 'semantic-ui-react';

import matthew from '../../assets/matthew.png';

export default ({ post }) => (
  <Item>
    <Item.Image size='small' src={matthew} />

    <Item.Content className="post-item">
      <Header as="h2">{post.heading}</Header>
      <Item.Meta>by {post.username}</Item.Meta>
      {/* <Item.Description>
        {post.content}
      </Item.Description> */}
      <Item.Extra><Icon color='green' name='check' />{post.likes}  <Icon color='red' name='remove' />{post.dislikes}</Item.Extra>
    </Item.Content>
  </Item>
);