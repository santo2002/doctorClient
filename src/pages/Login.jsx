import React from 'react';
import { Button, Checkbox, Form, Input, message } from "antd";
import "../styles/RegiserStyles.css";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from '../services/api';

import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from '../redux/features/alertSlice';


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // form handler
  const onfinishHandler = async (valiues) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(`${BASE_URL}/api/v1/uesr/login`, valiues);
      window.location.reload();
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("login Successfully!");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error('Something went wrong')
    }
  }
  return (
    <>
      <div className="form-container">
        <Form
          layout="vertical"
          onFinish={onfinishHandler}
          className="register-form"
        >
          <h3 className="text-center">Login From</h3>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <Link to="/register" className="m-2">
            Not a user Register here
          </Link>
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </Form>
      </div>
    </>
  )
}

export default Login;
