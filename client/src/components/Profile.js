import React, { Component } from 'react'
import { Header, Container, Card, Icon, Image } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import decode from 'jwt-decode'
import matthew from '../assets/matthew.png'
import '../styles/Profile.css'

class ProfileComponent extends Component {
  render() {
    let token = localStorage.getItem('token')

    if (!token || token == 'undefined') {
      return <Redirect to="/login" />
    } 
    
    else {
      let { exp } = decode(token)

      if (exp < new Date().getTime() / 1000)
        return <Redirect to="/login" />
        
      else {
        let user = decode(token)
        return (
          <Container className="profile">
            <Card>
              <Image src={matthew} />
              <Card.Content>
                <Card.Header>
                  {user.firstName} {user.lastName}
                </Card.Header>
                <Card.Meta>
                  <span className='date'>
                    Joined in {user.createdAt.substring(0,10)}
                  </span>
                </Card.Meta>
                {/* <Card.Description>
                  Matthew is a musician living in Nashville.
                </Card.Description> */}
              </Card.Content>
              {/* <Card.Content extra>
                <a>
                  <Icon name='user' />
                  22 Friends
                </a>
              </Card.Content> */}
            </Card>
          </Container>
        )
      }
    }
  }
}

export default ProfileComponent