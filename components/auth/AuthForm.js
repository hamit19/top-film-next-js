import React, { useState } from "react";
import { Form, Input } from "antd";
import Button from "react-bootstrap/Button";
import Styles from "./AuthForm.module.css";

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className={Styles.main}>
      <div className={Styles.form_wrapper}>
        <div>
          <h1 className={Styles.auth_title}>
            {!isSignUp ? "Sign In" : "Sign Up"}
          </h1>
        </div>
        <Form
          onFinish={(props) => console.log(props)}
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
            rules={[{ required: true, message: "Please enter your username" }]}
          >
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            hasFeedback
            rules={[
              { required: true, message: "Please enter your password" },
              { min: 8 },
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

                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
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
