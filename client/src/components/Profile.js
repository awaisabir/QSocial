import React, { Component } from 'react'
import { Header, Container } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import decode from 'jwt-decode'

class ProfileComponent extends Component {

  render() {
    let token = localStorage.getItem('token')

    if (!token) {
      return <Redirect to="/login" />
    } else {
      let { exp } = decode(token)
      if (exp < new Date().getTime() / 1000)
        return <Redirect to="/login" />
    }

    return (
      <Container>
        <Header as='h2'>This will be the Profile Component</Header>
      </Container>
    )
  }
}

export default ProfileComponent