import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPostById } from '../../actions/index';
import { Header, Container, Loader, Dimmer, Button, Icon, Image, Label } from 'semantic-ui-react';
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
          <div style={{marginBottom: '10px'}}>
            {post.categories.map(category => (
              <Label key={category}>{category}</Label>
            ))}
          </div>
          <p>by {post.username}</p>
          <div style={{border: '1px solid black', borderRadius: '3px', padding: '10px', marginBottom: '10px'}}>
            <p style={{overflowWrap: 'break-word'}}>{post.content}</p>
          </div>
          <Button onClick={() => history.goBack()}>
          <Icon name='chevron left' /> Go Back
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