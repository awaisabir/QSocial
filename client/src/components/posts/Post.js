import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPostById } from '../../actions/index';
import { Header, Container, Loader, Dimmer, Button, Icon, Image } from 'semantic-ui-react';
import matthew from '../../assets/matthew.png'

class Post extends Component {
  componentWillMount() {
    const { id } = this.props.match.params;
    this.props.getPostById(id);
  }

  render() {
    const { fetched, fetching, success, post, history } = this.props;

    if (fetching) {
      return (
        <Container>
          <Dimmer><Loader><span style={{color: '#0e51d6'}}>Fetching Post ...</span></Loader></Dimmer>
        </Container>
      );
    }

    if (fetched && success) {
      return (
        <Container>
          <Image src={matthew} size='small'/>
          <Header as='h2'>{post.heading}</Header>
          <p>by {post.username}</p>
          <p>{post.content}</p>
          <Button onClick={() => history.push(`/`)}>
          <Icon name='chevron left' /> All Posts
          </Button>
        </Container>
      );
    }

    return (
      <Container>
        <Header as='h2'>Something went wrong ...</Header>
      </Container>
    );
  }
};

const mapStateToProps = ({postReducer}) => postReducer;
const mapDispatchToProps = dispatch => bindActionCreators({getPostById}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Post);