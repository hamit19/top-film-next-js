import React, { useState } from "react";
import { Form, Input } from "antd";
import Button from "react-bootstrap/Button";
import Styles from "./AuthForm.module.css";
import axios from "axios";
import { toast } from "react-toastify";

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const [form] = Form.useForm();

  const handleSubmit = async (props) => {
    if (isSignUp) {
      const values = {
        username: props.username,
        password: props.password,
        email: props.email,
      };
      await axios
        .post("/api/user", { ...values })
        .then((res) => {
          res.status === 200 &&
            toast.success("Great! you have registered successfully.");
          form.resetFields();
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.errorMessage);
        });
    }
  };

  const checkTheRePassword = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }

      return Promise.reject(
        new Error("The two passwords that you entered do not match!")
      );
    },
  });

  return (
    <div className={Styles.main}>
      <div className={Styles.form_wrapper}>
        <div>
          <h1 className={Styles.auth_title}>
            {!isSignUp ? "Sign In" : "Sign Up"}
          </h1>
        </div>
        <Form
          onFinish={(props) => handleSubmit(props)}
          onFinishFailed={(error) => console.log(error)}
          className={Styles.form}
        >
          {isSignUp && (
            <Form.Item
              name="email"
              rules={[
                { required: true, message: " Please enter your email" },
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
              ]}
            >
              <Input placeholder="E-mail" />
            </Form.Item>
          )}

          <Form.Item
            name="username"
            rules={[
              { required: true, message: "Please enter your username" },
              {
                pattern: /^[A-Za-z][A-Za-z0-9]*$/,
                message: "Please enter your username with Latin letters!",
              },
              {
                min: 6,
                message: "Your username must be at least 6 characters long!",
              },
            ]}
          >
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            hasFeedback
            rules={[
              { required: true, message: "Please enter your password" },
              {
                min: 8,
                message: "Your password must be at least 8 characters long!",
              },
              {
                pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/,
                message:
                  "Your password must at least contain a number and one special character!  ",
              },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          {isSignUp && (
            <Form.Item
              name="conform"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },

                (props) => checkTheRePassword(props),
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
          )}

          <Button variant="primary" type="submit" onClick={() => {}}>
            {!isSignUp ? "Sign In" : "Sign Up"}
          </Button>

          {!isSignUp ? (
            <p className={Styles.text_auth}>
              Not a Member?{" "}
              <span onClick={() => setIsSignUp(true)}>Sign Up</span>
            </p>
          ) : (
            <p className={Styles.text_auth}>
              Already have an account?{" "}
              <span onClick={() => setIsSignUp(false)}>Sign In</span>
            </p>
          )}
        </Form>
      </div>
    </div>
  );
};

export default AuthForm;
