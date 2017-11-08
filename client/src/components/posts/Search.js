import React, { Component } from 'react';
import { Form, Input } from 'semantic-ui-react';

export default ({onFormSubmit, onInput}) => (
  <Form onSubmit={onFormSubmit}>
    <Form.Field>
      <Input 
        action={{ icon: 'search' }}
        placeholder="Search for a post ..."
        onChange={e => {onInput(e.target.value)}} 
      />
    </Form.Field>
  </Form>
);