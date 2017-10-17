import React, { Component } from 'react';
import { Container, Header, Message, Button, Form, Loader, Dimmer } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { register } from '../actions/index';
import '../styles/Register.css';

class RegisterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      validationError: false,
      componentRendered: true,
    };

    this.submitHandler = this.submitHandler.bind(this);
  }

  render() {
    const {fetched, fetching, data, errors} = this.props;

    return (
      <Container text>
        {this.state.validationError ? <Message negative>Please fill in all the fields correctly</Message> : null}
        {errors.length > 0 ? <Message negative>Seems like our server is not responding ... Try again later!</Message> : null}
        {fetching ? <Dimmer inverted active><Loader><span style={{color: '#0e51d6'}}>Saving your details ... </span></Loader></Dimmer> : null}
        {fetched && !this.state.componentRendered ?
          data.data.success ? <Message positive>{data.data.message}</Message>
          : <Message negative>{data.data.message}</Message>
          : null
        }
        <Header as='h2'>Register</Header>
        <Form onSubmit={this.submitHandler}>
          <Form.Field>
            <label>Username</label>
            <input type="text" onChange={(e) => {this.setState({username: e.target.value})}} value={this.state.username}/>
          </Form.Field>
          <Form.Field>
              <label>Email</label>
              <input 
                placeholder='example@example.com' 
                type="email" 
                onChange={(e) => {this.setState({email: e.target.value})}}
                value={this.state.email}
              />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input type="password" onChange={(e) => {this.setState({password: e.target.value})}} value={this.state.password}/>
          </Form.Field>
          <Form.Group>
            <Form.Field>
              <label>First Name</label>
              <input type="text" onChange={(e) => {this.setState({firstName: e.target.value})}} value={this.state.firstName}/>
            </Form.Field>
            <Form.Field>
              <label>Last Name</label>
              <input type="text" onChange={(e) => {this.setState({lastName: e.target.value})}} value={this.state.lastName}/>
            </Form.Field>
          </Form.Group>
          <Button type='submit' style={{marginTop: '15px'}}>Register</Button>
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </Form>
      </Container>
    );
  };

  submitHandler() {
    const {username, password, email, firstName, lastName} = this.state;
    let formFields = {username, password, email, firstName, lastName};

    if (!this.validateEmail(email)) {
      this.setState({validationError: true});
      return;
    } else
      this.setState({validationError: false});

    for (let key in formFields) {
      if (formFields[key] === '') {
        this.setState({validationError: true});
        break;
      } else {
        this.setState({validationError: false});
      }
    }

    if (!this.state.validationError) {
      this.setState({componentRendered: false, username: '', password: '', firstName: '', lastName: '', email: ''});
      this.props.register(username, password, email, firstName, lastName);
    }
  }

  validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
}

const mapStateToProps = state => {
  let { registrationReducer } = state;

  return registrationReducer;
}

const mapDispatchToProps = dispatch => bindActionCreators({register}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RegisterComponent);