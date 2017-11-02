import React, { Component } from 'react';
import { Header, Container, Loader,  } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPosts } from '../actions/index';

import PostsList from '../components/posts/PostsList';
import PostsPagination from '../components/posts/PostsPagination';

class PostsContainer extends Component {
  componentDidMount() {
    this.props.getPosts(1);
  }

  render() {
    let { fetching, fetched, success, posts } = this.props;

    if (fetching)
      return <Loader><span style={{color: '#0e51d6'}}>Loading Posts ... </span></Loader>;

    if (fetched && success) {
      return (
        <Container>
          <PostsList posts={posts}/>
          <PostsPagination />
        </Container>
      );
    }

    return (
      <Container>
        <Header as='h2'>Something went wrong ...</Header>
      </Container>
    );
  }
}

const mapStateToProps = ({postsReducer}) => postsReducer;
const mapDispatchToProps = dispatch => bindActionCreators({getPosts}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PostsContainer);