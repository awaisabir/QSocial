import React, { Component } from 'react'
import { Container, Header, Message, Button, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../actions/index'

class RegisterComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      validationError: false,
    }

    this.submitHandler = this.submitHandler.bind(this)
  }

  render() {
    const {fetched, fetching, data, errors} = this.props

    return (
      <Container text>
        <Header as='h2'>Register</Header>
        {this.state.validationError ? <Message negative>Please fill in all the fields correctly</Message> : null}

        {fetched ?
          data.data.success ? <Message positive>{data.data.message}</Message>
          : <Message negative>{data.data.message}</Message>
          : null
        }

        <Form style={{marginTop: '50px'}} onSubmit={this.submitHandler}>
          <Form.Field>
            <label>Userame</label>
            <input type="text" onChange={(e) => {this.setState({username: e.target.value})}}/>
          </Form.Field>
          <Form.Field>
              <label>Email</label>
              <input 
                placeholder='example@example.com' 
                type="email" 
                onChange={(e) => {this.setState({email: e.target.value})}}
              />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input type="password" onChange={(e) => {this.setState({password: e.target.value})}}/>
          </Form.Field>
          <Form.Field>
            <label>First Name</label>
            <input type="text" onChange={(e) => {this.setState({firstName: e.target.value})}}/>
          </Form.Field>
          <Form.Field>
            <label>Last Name</label>
            <input type="text" onChange={(e) => {this.setState({lastName: e.target.value})}}/>
          </Form.Field>
          <Button type='submit'>Submit</Button>
        </Form>
      </Container>
    )
  }

  submitHandler() {
    const {username, password, email, firstName, lastName} = this.state
    let dummy = {username, password, email, firstName, lastName}

    if (!this.validateEmail(email)) {
      this.setState({validationError: true}) 
      return
    } else
      this.setState({validationError: false})

    for (let key in dummy) {
      if (dummy[key] === '') {
        this.setState({validationError: true})
        break
      } else {
        this.setState({validationError: false})
      }
    }

    if (!this.state.validationError) {
      this.props.register(username, password, email, firstName, lastName)
    }
  }

  validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  }
  
}

const mapStateToProps = state => {
  let { registerationReducer } = state

  return registerationReducer
}

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RegisterComponent)