import React, { Component } from 'react';
import { Header, Container, Loader, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPosts } from '../actions/index';

import PostsList from '../components/posts/PostsList';
import PostsPagination from '../components/posts/PostsPagination';
import Search from '../components/posts/Search';

class PostsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      searchTerm: '',
      order: 'desc',
      headingSearched: false,
    };
    
    this.incrementPage = this.incrementPage.bind(this);
    this.decrementPage = this.decrementPage.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onInput = this.onInput.bind(this);
  }

  componentDidMount() {
    const { page, searchTerm, order } = this.state;
    this.props.getPosts(page, searchTerm, order);
  }

  componentDidUpdate(prevProps, prevState) {
    const { page, searchTerm } = this.state;
    
    if (page !== prevState.page)
      this.props.getPosts(page, searchTerm);
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
    const { page, searchTerm, order } = this.state;

    this.props.getPosts(page, searchTerm, order);
  }

  onInput(searchTerm) {
    this.setState({searchTerm: searchTerm});
  }

  render() {
    const { fetching, fetched, success, posts, history, count, totalPosts } = this.props;
    const { searchTerm } = this.state;

    if (fetching)
      return <Loader><span style={{color: '#0e51d6'}}>Loading Posts ... </span></Loader>;

    if (fetched && success) {
      let max = Math.ceil(totalPosts/10);

      return (
        <Container>
          <div className="search-container">
            <Search onFormSubmit={this.onFormSubmit} onInput={this.onInput}/>
          </div>
          <PostsList posts={posts}/>
          {searchTerm !== '' ? 
            <Button icon="chevron left" content="Back to posts" onClick={() => history.push('/')}/> : 
            null
          }
          <PostsPagination 
            page={this.state.page}
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
const mapDispatchToProps = dispatch => bindActionCreators({getPosts}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PostsContainer);