import React, { Component } from 'react';
import { Modal, Icon, Button, Form, Label, Input, TextArea, Loader, Dimmer } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createPost, modalClosed, modalOpened } from '../../actions/index';

import '../../styles/checkmark.css'

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
    this._modalOnOpen = this._modalOnOpen.bind(this);
  }

  _modalOnClose() {
    this.setState({heading: '', content: '', category: '', categories: []});
    this.props.modalClosed();
  }

  _modalOnOpen() {
    this.props.modalOpened();
  }


  render() {
    const { userId, createPost, history, post, fetching, fetched, success } = this.props;
    const { heading, content, category, categories } = this.state;

    return (
      <Modal dimmer={'blurring'} trigger={<Button circular icon='plus' />} onClose={this._modalOnClose} onOpen={this._modalOnOpen}>
        <Modal.Header>Title: {heading}</Modal.Header>
        <Modal.Content scrolling>
          <Modal.Description>
            {fetching ? 
              <Dimmer active>
              <Loader indeterminate>Creating Post ...</Loader>
              </Dimmer> : 
              null
            }

            {fetched ? 
              <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/><path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
              </svg>   
              : null
            }
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
          {fetched && success ?
            <Button color='olive' onClick={() => history.push(`/posts/${post._id}`)}>
              Go to Post <Icon name='right chevron' />
            </Button> : 
            <Button primary onClick={() => {createPost(localStorage.getItem('token'), userId, heading, content, categories)}}>
              Create Post<Icon name='right chevron' />
            </Button>
          }
        </Modal.Actions>
      </Modal>
    );
  }
};

const maptStateToProps = ({ postReducer }) => postReducer;
const mapDispatchToProps = dispatch => bindActionCreators({createPost, modalClosed, modalOpened}, dispatch);

export default connect(maptStateToProps, mapDispatchToProps)(MyModal);