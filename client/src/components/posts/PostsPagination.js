import React from 'react';
import { Header, Container, Button } from 'semantic-ui-react';

import '../../styles/Pagination.css'

export default ({ page, increment, decrement }) => (
    <Container className="pagination-container">
      <Button className="pagination" icon="chevron circle left" onClick={() => decrement(page)} />
      <Header as='h5'>{page}</Header>
      <Button className="pagination right" icon="chevron circle right" onClick={() => increment(page)} />
    </Container>
);