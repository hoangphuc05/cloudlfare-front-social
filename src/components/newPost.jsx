import React from 'react';

import {Form, Input, Button} from 'antd';
import { FormInstance } from 'antd/es/form';
import 'antd/dist/antd.css';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import {newPost} from '../utils/post';

class NewPost extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   oldUsername: '', //store the old username for update
    // };
  }

  componentDidMount() {
    this.formRef.current.setFieldsValue({
      username: this.props.username
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.username !== prevProps.username) {
      this.formRef.current.setFieldsValue({
        username: this.props.username
      })
    }
  }

  handleChange = (changedValues, allValues) => {
    this.setState({
      username: allValues.username,
      title: allValues.title,
      content: allValues.content,
    });
  }

  submitPost = (values) => {
    // console.log(values);
    newPost(values).then(res => {
      this.props.addLocalPost({...values, timestamp: Date.now()});
      
    }).then(() => {
      this.formRef.current.resetFields();
      this.formRef.current.setFieldsValue({
        username: this.props.username
      })
    });
  }

  //reference to the form
  formRef = React.createRef();

  render() {
    return (
      <>
        <Form
          // form={this.state.form}
          ref={this.formRef}
          layout="vertical"
          onValuesChange={this.handleChange}
          onFinish={this.submitPost}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{required: true, message: 'Please input your username!'}]}
            value
          >
            <Input disabled/>
          </Form.Item>
          
          <Form.Item
            label="Title"
            name="title"
            rules={[{required: true, message: 'Please input your title!'}]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Content"
            name="content"
            rules={[{required: true, message: 'Please input your content!'}]}>
              <Input.TextArea />
          </Form.Item>

          <Form.List name="images">
            {(fields, {add, remove}) =>(
              <>
                {
                  fields.map((field, index) => (
                    <Form.Item
                      {...field}
                      label={<><MinusCircleOutlined className="dynamic-delete-button" style={{margin: '0 8px'}} onClick={() => {remove(field.name);}} /> {`Image ${index + 1}`}</>}
                      required={false}
                      key={field.key}
                    >
                      
                      <Form.Item
                        {...field}
                        validateTrigger={['onChange', 'onBlur']}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: "Please put in image url or delete this field.",
                          },
                        ]}
                        
                      >
                        <Input type="url" placeholder="Image's URL" />
                      </Form.Item>

                    </Form.Item>
                  ))
                }
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                    // style={{width: '60%'}}
                    block
                    icon={<PlusOutlined />}
                  >
                     Add Image
                  </Button>
                </Form.Item>
              </>
            )}  
          </Form.List>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Post
            </Button>
          </Form.Item>
        </Form>
      </>
    );  
}
}

export default NewPost;
