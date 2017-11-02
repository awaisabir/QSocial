import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';

import PostItem from './PostItem';
import '../../styles/Post.css';

export default class PostsList extends Component {
  render() {
    console.log(this.props.posts);
    return (
      <div>
        <div className="posts-container">
          {this.props.posts.map(post => (
              <div key={post._id} className="postsItem">
                {post.heading}
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}