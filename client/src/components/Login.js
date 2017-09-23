import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Header, Button, Form } from 'semantic-ui-react'

export default () => (
  <Container text>
    <Header as='h2'>Login</Header>
    <Form>
      <Form.Field>
        <label>Username</label>
        <input />
      </Form.Field>
      <Form.Field>
        <label>Password</label>
        <input />
      </Form.Field>
      <Button type='submit'>Login</Button>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </Form>
  </Container>
)