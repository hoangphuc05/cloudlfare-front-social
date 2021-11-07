import React from 'react';
import {Form, Input, Button, Avatar} from 'antd';
import 'antd/dist/antd.css';

import { newComment } from '../utils/post';

class NewComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
    };
  }
  handleEnter = () => {

    newComment({
      post: this.props.postId,
      username: this.props.username,
      comment: this.state.comment,
    }).then(() => {
      this.props.addLocalComment(
        {   
          post: this.props.postId,
          username: this.props.username,
          comment: this.state.comment,
          timestamp: Date.now(),
        }
      );
    }).finally(() => {
      this.setState({comment: ''});
    });
  }
  render() {
    return(
      <>
      <div className="flex flex-row">
        <Avatar className="inline m-2"  src={`https://avatars.dicebear.com/api/avataaars/${this.props.username}.svg`} />
        <div className="inline flex-grow">
          <Input placeholder="Write a comment..." value={this.state.comment} onPressEnter={this.handleEnter} onChange={(e) => this.setState({comment: e.target.value})} />
        </div>
      </div>
        
      </>
    )
  }
}

export default NewComment;