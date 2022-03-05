import React, { useState } from 'react';
import ListCards from './ListCards';
import axios from 'axios'
import { Form, Input, Button, Row, Col } from 'antd';

const Cards = (props) => {
  const {login, setLogin} = props
  const [cards, setCards] = useState(login.cards);


  const onFinish = (v) => {
  console.log(v)
    setCards([...cards, v])
    axios({
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      url: 'http://localhost:5000/api/user/'+ login.id,
      withCredentials: true,
      data: {
        cards: [...cards, v]
      },
    }).then(res => {
      console.log(res)
    })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Row>
      <Col spam={12}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ pan: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {/* Name (mandatory short text field)
• Company name (optional short text field)
• Email address (optional long text field)
• Telephone number (optional phone field) */}
          {["username", "name", "company", "mail", "phone"].map(v =>
            <Form.Item
              label={v}
              name={v}
              key={v}
              rules={[{
                required: v === "name" ? true : v  === "password" ? true : false,
                type: v === "mail" && 'email'
              },]}
            >
              <Input 
              defaultValue={v === "username" ? login.username : ""}
              disabled={v === "username"}
              />
            </Form.Item>
          )}
          <Form.Item
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
          <Form.Item
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Button type="primary" onClick={() => setLogin({})}>
              Disconnect
            </Button>
          </Form.Item>
        </Form>
      </Col>
      <Col spam={12}>
      <ListCards cards={cards} />
      </Col>
    </Row>

  );
};

export default Cards;
