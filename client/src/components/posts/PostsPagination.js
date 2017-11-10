import React from 'react';
import { Header, Container, Button } from 'semantic-ui-react';

import '../../styles/Pagination.css'

export default ({ page, max, increment, decrement }) => (
    <Container className="pagination-container">
      {page !== 1 ?
        <Button className="pagination" icon="chevron circle left" onClick={() => decrement(page)} /> :
        null
      }
      <Header as='h5'>{page}</Header>
      {page !== max ?
        <Button className="pagination right" icon="chevron circle right" onClick={() => increment(page)} /> :
        null
      }
    </Container>
);