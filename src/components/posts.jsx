import React from 'react';
import {List, Avatar,Image, Comment} from 'antd';
import 'antd/dist/antd.css';
import NewComment from './newComment';

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      author: this.props.author,
      time: this.props.time,
      content: this.props.content,
    };
  }



  render(){
    console.log(this.props.allPosts);
    return (<>
    {this.props.allPosts?<List
      itemLayout="vertical"
      size="large"
      dataSource={this.props.allPosts}
      renderItem={item =>(

        //post box
        <div className="bg-white p-2 rounded-md shadow-md my-2">
          
          {/* Post author and timestamp */}
          <div className="flex p-1">
            <Avatar size="large" src={`https://avatars.dicebear.com/api/avataaars/${item.username}.svg`} />
            <div className="flex flex-col">
              <h3><b>{item.username}</b></h3>
              <p className="text-gray-400 text-xs">{new Date(item.timestamp).toLocaleString()}</p>
            </div>
          </div>
          <hr/>

          {/* post content */}
          <div className="p-2">
            <h4>{item.title}</h4>
            <p>{item.content}</p>
          </div>

          {/* post images */}
          {
            item.images? <Image.PreviewGroup>
              {item.images.map((image, index) => (
                <div key={index} className="p-2">
                  <Image src={image} alt="post image" />
                </div>
              ))}
            </Image.PreviewGroup>:null
          }
          <hr/>
          {
            
            //loop through comments and show the one belongs to this post
            this.props.allComments?this.props.allComments.map((comment, index) => {
              console.log(comment);
              if (comment.post === item.id)
                return <div key={index} className="">
                  <Comment 
                    author={comment.username}
                    avatar={<Avatar className=""  src={`https://avatars.dicebear.com/api/avataaars/${comment.username}.svg`} />}
                    content={comment.comment}
                    datetime={new Date(comment.timestamp).toLocaleString()}
                  />
                </div>
            }):null
          }
          <NewComment username={this.props.username} postId={item.id} addLocalComment={this.props.addLocalComment}/>
        </div>
      )}
    />:<div></div>}
    
    </>)
  }

}
export default Posts;