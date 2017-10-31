import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';

import PostItem from './PostItem';

export default class PostsList extends Component {
  render() {
    return (
      <div>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          {this.props.posts.map(post => (
              <div key={post._id}>
                {post.heading}
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}