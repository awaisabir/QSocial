import React, { Component } from 'react';
import { Header, Container, Loader,  } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPosts } from '../actions/index';

import PostsList from '../components/posts/PostsList';
import PostsPagination from '../components/posts/PostsPagination';

class PostsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
    
    this.incrementPage = this.incrementPage.bind(this);
    this.decrementPage = this.decrementPage.bind(this);
  }

  componentDidMount() {
    this.props.getPosts(this.state.page);
  }

  incrementPage(page) {  
    this.setState({page: this.state.page+1});
  }

  decrementPage(page) {
    if (page <= 1)
      this.setState({page: 1});
    else    
      this.setState({page: this.state.page-1});
  }

  render() {
    let { fetching, fetched, success, posts } = this.props;

    if (fetching)
      return <Loader><span style={{color: '#0e51d6'}}>Loading Posts ... </span></Loader>;

    if (fetched && success) {
      return (
        <Container>
          <PostsList posts={posts}/>
          <PostsPagination page={this.state.page} increment={this.incrementPage} decrement={this.decrementPage}/>
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