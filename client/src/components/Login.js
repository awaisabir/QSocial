import React from 'react'
import { Container, Header, Button, Form } from 'semantic-ui-react'

export default () => (
  <Container text>
    <Header as='h2'>Login</Header>
    <Form style={{marginTop: '50px'}}>
      <Form.Field>
        <label>Userame</label>
        <input placeholder='First Name' />
      </Form.Field>
      <Form.Field>
        <label>Password</label>
        <input placeholder='First Name' />
      </Form.Field>
      <Button type='submit'>Submit</Button>
    </Form>
  </Container>
)