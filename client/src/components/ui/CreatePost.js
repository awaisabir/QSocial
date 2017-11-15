import React, { Component } from 'react';
import { Modal, Icon, Button, Form, Label, Input, TextArea } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createPost, createdPost } from '../../actions/index';

class MyModal extends Component {
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

  componentDidUpdate() {
    const { fetched, success, history, createdPost } = this.props;

    if (fetched && success) {
      createdPost();
      history.push('/');
    }
  }

  _modalOnClose() {
    this.setState({heading: '', content: '', category: '', categories: []});
  }

  render() {
    const { userId, createPost } = this.props;
    const { heading, content, category, categories } = this.state;


    return (
      <Modal dimmer={'blurring'} trigger={<Button circular icon='plus' />} onClose={this._modalOnClose} >
        <Modal.Header>Title: {heading}</Modal.Header>
        <Modal.Content scrolling>
          <Modal.Description>
            <div>
              {categories.map(category => (
                <Label key={category}>{category}</Label>
              ))}
            </div>

            <p style={{marginTop: '15px'}}>{content}</p>

            <Form>
              <div style={{marginBottom: '5px'}}>
                <Input onChange={e => {this.setState({heading: e.target.value})}} placeholder={'Enter your title here'}/>
              </div>
              <div style={{marginTop: '10px'}}>
                <Input placeholder={'Add category(ies)'} onChange={e => this.setState({category: e.target.value})} value={category}/>

                {this.state.category === '' 
                  ? null : 
                  <Button 
                  onClick={() => {this.setState({categories: [...categories, category], category: ''})}}
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
          <Button primary onClick={() => {createPost(localStorage.getItem('token'), userId, heading, content, categories)}}>
            Create Post<Icon name='right chevron' />
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
};

const maptStateToProps = ({ postReducer }) => postReducer;
const mapDispatchToProps = dispatch => bindActionCreators({createPost, createdPost}, dispatch);

export default connect(maptStateToProps, mapDispatchToProps)(MyModal);