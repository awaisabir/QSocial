import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';

export default class SearchComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {term: ''};

    this.updateTerm = this.updateTerm.bind(this);
  }

  updateTerm(term) {
    this.setState({term});
  }

  render() {
    return (
        <Input 
          action={{ icon: 'search' }} 
          placeholder="Search by heading ..."
          onChange={(e) => this.updateTerm(e.target.value)}  
        />
    );
  }
};