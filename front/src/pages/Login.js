import React, { useState } from 'react';
import axios from 'axios'
import Cards from './Cards';
import { Form, Input, Button, Row, Col } from 'antd';

const Login = () => {
  const [login, setLogin] = useState({});

  console.log(login)

  const onFinish = (values) => {
    console.log('Success:', values);
    axios({
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      url: 'http://localhost:5000/api/user/login',
      withCredentials: true,
      data: {
        username: values.username,
        password: values.password,
      },
    }).then(res => {
      setLogin({
        id: res.data._id,
        username: res.data.username,
        cards: res.data.cards
      })
      console.log(login)
    }).catch(err => {
      console.error(err.message);
      axios({
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        url: 'http://localhost:5000/api/user/register',
        withCredentials: true,
        data: {
          username: values.username,
          password: values.password,
        },
      }).then(res => {
        console.log(res)
        setLogin({
          id: res.data._id,
          username: res.data.username,
          cards: res.data.cards
        })
      })
    })
  };

  return (
    <Row>
      <Col spam={12}>
        {Object.keys(login).length !== 0 ? <Cards login={login} setLogin={setLogin} /> :
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ pan: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            {["username", "password"].map(v =>
              <Form.Item
                label={v}
                name={v}
                key={v}
                rules={[{
                  required: v === "username" ? true : v === "password" ? true : false,
                  message: `Please input your username! ${v}`,
                },]}
              >
                <Input />
              </Form.Item>
            )}
            <Form.Item
              wrapperCol={{ offset: 8, span: 16 }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        }
      </Col>
    </Row>

  );
};

export default Login;
