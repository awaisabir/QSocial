import React, { Component } from 'react'
import { Container, Header, Message, Button, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'

class RegisterComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      error: false,
    }

    this.submitHandler = this.submitHandler.bind(this)
  }

  render() {
    return (
      <Container text>
      
      <Header as='h2'>Register</Header>
        {this.state.error ? <Message negative>Please fill in all the fields correctly</Message> : null}
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
      this.setState({error: true}) 
      return
    } else
      this.setState({error: false})

    for (let key in dummy) {
      if (dummy[key] === '') {
        this.setState({error: true})
        break
      } else {
        this.setState({error: false})
      }
    }
  }

  validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  }

}

const mapStateToProps = state => {
  let { authReducer } = state

  return authReducer
}

export default connect(mapStateToProps)(RegisterComponent)