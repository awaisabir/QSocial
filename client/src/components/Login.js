import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Container, Header, Button, Form , Message, Dimmer, Loader } from 'semantic-ui-react'
import { login } from '../actions/index'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class LoginComponent extends Component {
  componentWillMount() {
    this.setState({componentRendered: true})
  }

  constructor(props) {
    super(props)
    this.state = {username: '', password: '', validationError: false, componentRendered: true}
    this.submitHandler = this.submitHandler.bind(this)
  }

  render() {
    let { fetching, fetched, errors, data } = this.props
    return (
      <Container text>
        {/* {this.state.validationError ? <Message negative>Please fill in all the fields correctly</Message> : null} */}
        {fetching ? <Dimmer active><Loader/></Dimmer> : null}
        {fetched && !this.state.componentRendered ?
          data.data.success ? <Redirect to="/profile" />
          : <Message negative>{data.data.message}</Message>
          : null
        }
        <Header as='h2'>Login</Header>
        <Form onSubmit={this.submitHandler}>
          <Form.Field>
            <label>Username</label>
            <input type="text" onChange={e => {this.setState({username: e.target.value})}} />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input type="password" onChange={e => {this.setState({password: e.target.value})}} />
          </Form.Field>
          <Button type='submit'>Login</Button>
          <p>Don't have an account? <Link to="/register">Register</Link></p>
        </Form>
      </Container>
    )
  }

  submitHandler() {
    const { username, password } = this.state
    let formFields = {username, password}

    for (let key in formFields) {
      if (formFields[key] === '') {
        this.setState({validationError: true})
        break
      } else {
        this.setState({validationError: false})
      }
    }

    if (!this.state.validationError) {
      this.setState({componentRendered: false})
      this.props.login(username, password)
    }
  }
}

const maptStateToProps = ({authenticationReducer}) => authenticationReducer
const mapDispatchToProps = dispatch => bindActionCreators({login}, dispatch)

export default connect(maptStateToProps, mapDispatchToProps)(LoginComponent)