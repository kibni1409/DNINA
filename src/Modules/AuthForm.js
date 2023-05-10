import { Button, Form, Input } from 'antd';
import {useLoginMutation} from "../services/AuthAPI";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import Style from './AuthForm.module.scss'

const AuthForm = () => {
  const navigate = useNavigate()

  let user = localStorage.getItem('user')

  useEffect(()=>{
    if(user !== null){
      navigate('/tables')
    }
  }, [])

  const [login] = useLoginMutation()
  const onFinish = async (values) => {
    let data = {
      Password: values.password,
      Username: values.username
    }
    const res = await login(data)
    console.log(res)
    if(res.data.Value === true){
      localStorage.setItem('user', values.username)
      navigate('/tables')
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <h2 style={{textAlign: "center"}}>Авторизация</h2>
      <div className={Style.AuthForm}>
        <Form
          name="basic"
          labelCol={{
            span: 25,
          }}
          wrapperCol={{
            span: 25,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout='vertical'
        >
          <Form.Item
            label="Имя пользователя"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Пароль"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Вход
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

export default AuthForm
