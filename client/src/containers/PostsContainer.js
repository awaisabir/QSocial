import React, { Component } from 'react';
import { Header, Container, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPosts, incrementPage, decrementPage, onSearchInput, setPage, setHeading } from '../actions/index';
import { parse } from 'query-string';

import PostsList from '../components/posts/PostsList';
import PostsPagination from '../components/posts/PostsPagination';
import Search from '../components/posts/Search';
import CreatePost from '../components/posts/CreatePost';


class PostsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
    };
    
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidMount() {
    const { page, heading, location} = this.props;
    const query = parse(location.search);

    const { getPosts, setHeading, setPage } = this.props;
    if (query.heading !== "") {
      setPage(parseInt(query.page));
      setHeading(query.heading);
      getPosts(parseInt(query.page), query.heading);
    } else {
      setPage(parseInt(query.page))
      setHeading("");
      getPosts(parseInt(query.page), "");
    }
  }
  
  componentDidUpdate(prevProps, prevState) {
    const { getPosts, history, page, heading } = this.props;

    if (page !== prevProps.page){
      history.push(`/posts?heading=${heading}&page=${page}&order=desc`);
      setPage(page);
      getPosts(page, heading);
    }
  }

  onFormSubmit() {
    const { order } = this.state;
    const { history, heading, setPage } = this.props;

    setPage(1);
    history.push(`/posts?heading=${heading}&page=${1}&order=desc`);
    this.props.getPosts(1, heading);
  }

  render() {
    const { 
      fetching, 
      fetched, 
      success, 
      posts, 
      history, 
      totalPosts, 
      isAuthed, 
      userId, 
      page, 
      onSearchInput } = this.props;

    if (fetching)
      return <Loader><span style={{color: '#0e51d6'}}>Loading Posts ... </span></Loader>;

    if (fetched && success) {
      if (totalPosts === 0) {
        return (
          <Container className="no-posts-container">
            <Header as='h1'>Unfortunately there are no posts at the moment ... <span role="img" aria-label="emoji1">😓</span></Header>
            {isAuthed ? 
              <div style={{textAlign: 'center'}}>
                <Header as='h5'>Click the plus to Create the first post! <span role="img" aria-label="emoji2">😁</span></Header>
                <CreatePost userId={userId} history={history}/>
              </div> : 
              <div>
                <Header as='h5'>Login/Register to create a post! <span role="img" aria-label="emoji3">😁</span></Header>
              </div>
            }
          </Container>
        );
      }

      let max = Math.ceil(totalPosts/10);

      return (
        <Container>
          <div className="search-container">
            <Search onFormSubmit={this.onFormSubmit} onInput={onSearchInput}/>
          </div>

          <div className="search-container">
              {isAuthed ? <CreatePost userId={userId} history={history}/> : null}
          </div>
          
          <PostsList posts={posts} history={history}/>

          <PostsPagination 
            page={page}
            max={max}
            increment={this.props.incrementPage} 
            decrement={this.props.decrementPage}  
          />
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
const mapDispatchToProps = dispatch => bindActionCreators({getPosts, incrementPage, decrementPage, onSearchInput, setPage, setHeading}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PostsContainer);