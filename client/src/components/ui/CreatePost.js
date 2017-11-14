import React, { Component } from 'react';
import { Modal, Icon, Button, Header, Form, Label, List, Input, TextArea } from 'semantic-ui-react';

export default class MyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heading: '',
      content: '',
      categories: [],
      category: '',
    };

    this._modalOnClose = this._modalOnClose.bind(this);
  }

  _modalOnClose() {
    this.setState({heading: '', content: '', category: '', categories: []});
  }

  render() {
    const { userId } = this.props;

    return (
      <Modal dimmer={'blurring'} trigger={<Button circular icon='plus' />} onClose={this._modalOnClose} >
        <Modal.Header>Title: {this.state.heading}</Modal.Header>
        <Modal.Content scrolling>
          <Modal.Description>
            <div>
              {this.state.categories.map(category => (
                <Label key={category}>{category}</Label>
              ))}
            </div>

            <p style={{marginTop: '15px'}}>{this.state.content}</p>

            <Form>
              <div style={{marginBottom: '5px'}}>
                <Input onChange={e => {this.setState({heading: e.target.value})}} placeholder={'Enter your title here'}/>
              </div>
              <div style={{marginTop: '10px'}}>
                <Input placeholder={'Add category(ies)'} onChange={e => this.setState({category: e.target.value})} value={this.state.category}/>

                {this.state.category === '' 
                  ? null : 
                  <Button 
                  onClick={() => {this.setState({categories: [...this.state.categories, this.state.category], category: ''})}}
                  icon='tags'
                />
                }

              </div>

              <TextArea 
                style={{marginTop: '10px'}}
                autoHeight={true} 
                onChange={e => {this.setState({content: e.target.value})}} 
                placeholder={'Enter your content here'}
              />

            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button primary>
            Create <Icon name='right chevron' />
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
};