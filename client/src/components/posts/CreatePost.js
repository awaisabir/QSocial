import React, { Component } from 'react';
import { Modal, Icon, Button, Form, Label, Input, TextArea, Loader, Dimmer } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createPost, modalClosed, modalOpened } from '../../actions/index';

import '../../styles/alerts.css'

class MyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heading: '',
      content: '',
      categories: [],
      category: '',
      categoryError: false,
      open: false,
    };

    this._modalOnClose = this._modalOnClose.bind(this);
    this._modalOnOpen = this._modalOnOpen.bind(this);
    this._addCategory = this._addCategory.bind(this);
  }

  _modalOnClose() {
    this.setState({heading: '', content: '', category: '', categories: [], open: false});
    this.props.modalClosed();
  }

  _modalOnOpen() {
    this.setState({open: true});
    this.props.modalOpened();
  }

  _addCategory(category) {
    if (this.state.categories.includes(category))
      this.setState({categoryError: true});
  
    else {
      this.setState({categoryError: false});
      this.setState({categories: [...this.state.categories, category], category: ''})
    }
  }

  render() {
    const { userId, createPost, history, post, fetching, fetched, success } = this.props;
    const { heading, content, category, categories, categoryError } = this.state;

    return (
      <Modal 
        open={this.state.open} dimmer={'blurring'} 
        trigger={<Button circular icon='plus' />} 
        onClose={this._modalOnClose} onOpen={this._modalOnOpen}
      >

        <Modal.Header>Title: {heading}</Modal.Header>
        <Modal.Content scrolling>
          <Modal.Description>
            {fetching ? 
              <Dimmer active>
              <Loader indeterminate>Creating Post ...</Loader>
              </Dimmer> : 
              null
            }

            <div>
              {categoryError ? <p style={{color: 'red'}}>Tag already exists!</p> : null}
              {categories.map(category => (
                <Label key={category}>{category}</Label>
              ))}
            </div>

            <p style={{marginTop: '15px', overflowWrap: 'break-word'}}>{content}</p>

            <Form>
              <div style={{marginBottom: '5px'}}>
                <Input onChange={e => {this.setState({heading: e.target.value})}} placeholder={'Enter your title here'}/>
              </div>
              <div style={{marginTop: '10px'}}>
                <Input placeholder={'Add category(ies)'} onChange={e => this.setState({category: e.target.value})} value={category}/>

                {category === '' 
                  ? null : 
                  <Button 
                  onClick={() => this._addCategory(category)}
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

            {fetched ? 
              success ?
                <div className="f-modal-icon f-modal-success animate">
                  <span className="f-modal-line f-modal-tip animateSuccessTip"></span>
                  <span className="f-modal-line f-modal-long animateSuccessLong"></span>
                  <div className="f-modal-placeholder"></div>
                  <div className="f-modal-fix"></div>
                </div> :
                <div className="f-modal-icon f-modal-error animate">
                  <span className="f-modal-x-mark">
                    <span className="f-modal-line f-modal-left animateXLeft"></span>
                    <span className="f-modal-line f-modal-right animateXRight"></span>
                  </span>
                  <div className="f-modal-placeholder"></div>
                  <div className="f-modal-fix"></div>
                </div>
              : null
            }
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          {fetched && success ?
            <Button color='olive' onClick={() => history.push(`/posts/${post._id}`)}>
              Go to Post <Icon name='right chevron' />
            </Button>: 
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