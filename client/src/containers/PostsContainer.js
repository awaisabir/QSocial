import React, { Component } from 'react';
import { Header, Container, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPosts, headingSearched } from '../actions/index';
import { parse } from 'query-string';

import PostsList from '../components/posts/PostsList';
import PostsPagination from '../components/posts/PostsPagination';
import Search from '../components/posts/Search';
import CreatePost from '../components/posts/CreatePost';


class PostsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      heading: '',
      order: 'desc',
      tags: [],
    };
    
    this.incrementPage = this.incrementPage.bind(this);
    this.decrementPage = this.decrementPage.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onInput = this.onInput.bind(this);
  }

  componentDidMount() {
    const { location, getPosts } = this.props;

    if (Object.keys(parse(location.search)).length === 0) {
      const { page, heading, order } = this.state;
      getPosts(page, heading, order);
    } else {
      const { page, heading, order } = parse(location.search);
      getPosts(page, heading, order);
    }

  }
  
  componentDidUpdate(prevProps, prevState) {
    const { page, heading, order } = this.state;
    const { getPosts, history } = this.props;

    /**
     *  check if headingSearched is true from Redux 
     *  then set the page = to that instead of the page stored in component state
     */

    if (page !== prevState.page){
      history.push(`/posts?heading=${heading}&page=${page}&order=${order}`);
      getPosts(page, heading, order);
    }
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

  onFormSubmit() {
    const { page, heading, order } = this.state;
    const { history } = this.props;

    history.push(`/posts?heading=${heading}&page=${page}&order=${order}`);
    this.props.getPosts(page, heading, order);
    // call heading searched action here and set to true
  }

  onInput(heading) {
    this.setState({heading});
  }

  render() {
    const { fetching, fetched, success, posts, history, totalPosts, isAuthed, userId } = this.props;
    const { page } = this.state;

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
            <Search onFormSubmit={this.onFormSubmit} onInput={this.onInput}/>
          </div>

          <div className="search-container">
              {isAuthed ? <CreatePost userId={userId} history={history}/> : null}
          </div>
          
          <PostsList posts={posts} history={history}/>

          <PostsPagination 
            page={page}
            max={max}
            increment={this.incrementPage} 
            decrement={this.decrementPage}  
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
const mapDispatchToProps = dispatch => bindActionCreators({getPosts, headingSearched}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PostsContainer);