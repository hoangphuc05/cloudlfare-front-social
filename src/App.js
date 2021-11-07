import React from 'react';
// import 'antd/dist/antd.css';
import {Layout, Modal, Form, Input, Button} from 'antd';


import './App.css';
import './index.css';
import { getALlComments, getALlPost } from './utils/post';
import { render } from '@testing-library/react';
import Posts from './components/posts';
import NewPost from './components/newPost';

const { Header, Content, Footer } = Layout;

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      posts: [],
      comments: [],
      username: null,
      usernameTextbox: null,
      isModalOpen: false,
    }
  }

  componentDidMount(){
    getALlPost().then(posts => {
      console.log(posts);
      this.setState({
        posts: posts.data.reverse()
      })
    })

    getALlComments().then(comments => {
      this.setState({
        comments: comments.data
      })
    })
  }
  componentDidUpdate(){
    //if no username present, open modal
    if (!this.state.username && !this.state.isModalOpen){
      this.setState({
        isModalOpen: true
      })
    }
  }

  refreshAllPost = () => {
    getALlPost().then(posts => {
      this.setState({
        posts: posts.data.reverse()
      })
    })
  }

  addLocalPost = (post) => {
    this.setState({
      posts: [post, ...this.state.posts]
    })
  }

  //add comment locally instead of pulling from the server because of latency in data available.
  addLocalComment = (newComment) => {

    // //this may not get the latest comment
    // getALlComments().then(comments => {
    //   this.setState({
    //     comments: comments.data
    //   })
    // })

    this.setState({
      comments: [...this.state.comments, newComment]
    })
  }
  handleOk = () => {
    this.setState({
      isModalOpen: false,
      username: this.state.usernameTextbox,
    })
  }
  render(){
    return (
      <>
        
        <Modal title="Super secure login" visible={this.state.isModalOpen} onOk={this.handleOk} closable={false} footer={[
              <Button key="submit" type="primary" onClick={this.handleOk}>Ok
            </Button>]}>
          <p>Please enter your username</p>
          <Form>
            <Form.Item label="Username" rules={[{required:true}]}>
              <Input onChange={(e) => this.setState({usernameTextbox: e.target.value})}/>
            </Form.Item>
          </Form>
        </Modal>
        <Layout className="justify-items-center ">
          <Header>
            <div className="flex justify-between">
              <div>
                <h1 className="text-white inline">Phuc's book</h1>
                <p className="text-white inline"> - Coolest social media you have ever used</p>
              </div>
              <div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold  px-4 rounded inline" onClick={() => this.setState({isModalOpen: true})}>Change username </button>
              </div>
            </div>
            
          </Header>
  
          <Content className="content-body flex justify-center">
            <div className="flex-1 md:max-w-xl max-w-md">
              <div id="new-post" className="bg-white p-2 rounded-md shadow-md my-2">
                <h3>Create new post</h3>
                <NewPost username={this.state.username} addLocalPost={this.addLocalPost}/>
              </div>
              <hr/>
              <Posts username={this.state.username} allPosts={this.state.posts} allComments={this.state.comments} addLocalComment={this.addLocalComment}/>
            </div>
          </Content>
  
          <Footer>
  
          </Footer>
        </Layout>
      </>
    );
  }
  
}

export default App;
