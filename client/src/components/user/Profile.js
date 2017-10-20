import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react';
import matthew from '../../assets/matthew.png';
import '../../styles/Profile.css';

class ProfileComponent extends Component {
  render() {
    let { user } = this.props;
    return (
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
  };
};

export default ProfileComponent;