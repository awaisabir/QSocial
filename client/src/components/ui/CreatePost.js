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

  _redirectToPost(id) {
    const { history } = this.props;
    setTimeout(() => history.push(`/posts/${id}`), 2500);
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