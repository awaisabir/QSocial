import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Container, Header, Button, Form , Message, Dimmer, Loader } from 'semantic-ui-react';
import { login } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class LoginComponent extends Component {
  componentWillMount() {
    this.setState({componentRendered: true});
  }

  constructor(props) {
    super(props);
    this.state = {username: '', password: '', validationError: false, componentRendered: true};
    this.submitHandler = this.submitHandler.bind(this);
  }

  render() {
    let { fetching, fetched, success, token, message } = this.props;
    
    if (fetched)
      localStorage.setItem('token', token);

    if (fetched && !this.state.componentRendered && success)
      this.props.updateIsAuthed();

    return (
      <Container text>
        {fetching ? <Dimmer active inverted><Loader><span style={{color: '#0e51d6'}}>Loading Profile ... </span></Loader></Dimmer> : null}
        {fetched && !this.state.componentRendered ?
          success ? <Redirect to="/profile" />
          : <Message negative>{message}</Message>
          : null
        }
        <Header as='h2'>Login</Header>
        <Form onSubmit={this.submitHandler}>
          <Form.Field>
            <label>Username</label>
            <input type="text" onChange={e => {this.setState({username: e.target.value})}} value={this.state.username}/>
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input type="password" onChange={e => {this.setState({password: e.target.value})}} value={this.state.password}/>
          </Form.Field>
          <Button type='submit'>Login</Button>
          <p>Don't have an account? <Link to="/register">Register</Link></p>
        </Form>
      </Container>
    );
  }

  submitHandler() {
    const { username, password } = this.state;
    let formFields = {username, password};

    for (let key in formFields) {
      if (formFields[key] === '') {
        this.setState({validationError: true});
        break;
      } else {
        this.setState({validationError: false});
      }
    }

    if (!this.state.validationError) {
      this.setState({componentRendered: false, username: '', password: ''});
      this.props.login(username, password);
    }
  }
}

const maptStateToProps = ({authenticationReducer}) => authenticationReducer;
const mapDispatchToProps = dispatch => bindActionCreators({login}, dispatch);

export default connect(maptStateToProps, mapDispatchToProps)(LoginComponent);