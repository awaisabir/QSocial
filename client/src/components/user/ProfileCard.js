import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import matthew from '../../assets/matthew.png';
import '../../styles/Profile.css';

export default ({user}) => (
  <Card>
    <Image src={matthew} />
    <Card.Content>
      <Card.Header>
        {user.firstName} {user.lastName}
      </Card.Header>
      <Card.Description>
        <strong>Email:</strong> {user.email}
      </Card.Description>
      <Card.Meta>
        <span className='date'>
          Joined in {user.createdAt.substring(0,10)}
        </span>
      </Card.Meta>
    </Card.Content>
  </Card>
);