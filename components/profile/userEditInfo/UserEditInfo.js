import { Form, Input, Modal, Button } from "antd";
import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { AuthContextDispatcher } from "../../../context/auth";
import Styles from "./userEditInfo.module.css";

function UserEditInfo({ username, email }) {
  const [isDisabled, setIsDisabled] = useState(true);
  const setAuthState = useContext(AuthContextDispatcher);

  if (!username || !email) return <h3>Loading...</h3>;

  return (
    <div className={Styles.form_wrapper}>
      <h5>Edit your profile</h5>
      <Form
        initialValues={{
          email: email,
        }}
        onFinish={(values) => {
          Modal.confirm({
            title: "Are you Sure!",
            content: "Are you sure about changing your personal info?",
            okText: "Yes",
            cancelText: "No",

            onCancel: () => {
              setIsDisabled(true);
            },

            onOk: () => {
              try {
                axios
                  .patch("/api/user/updateuser", { ...values, username })
                  .then((res) => {
                    res?.data?.status === 200 &&
                      setAuthState({
                        token: res?.data?.token,
                        user: res?.data?.user,
                      });
                    toast.success(
                      "Grate, your info have updated successfully!"
                    );
                    window.location.reload();
                  })
                  .catch((err) =>
                    toast.error(
                      err?.response?.data?.messageError
                        ? err?.response?.data?.messageError
                        : "Something went wrong please try again!"
                    )
                  );

                setIsDisabled(true);
              } catch (err) {
                console.log(err);
              }
            },
          });
        }}
        onFinishFailed={(err) => console.log(err)}
      >
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
          <Input disabled={isDisabled} />
        </Form.Item>
        <Form.Item name="oldPassword">
          <Input.Password
            disabled={isDisabled}
            placeholder="Enter your old password!"
          />
        </Form.Item>

        <Form.Item
          rules={[
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
          name="newPassword"
        >
          <Input.Password
            placeholder="Enter your new password!"
            disabled={isDisabled}
          />
        </Form.Item>
        {!isDisabled ? (
          <Form.Item>
            <Button htmlType="submit" type="link">
              Submit
            </Button>
          </Form.Item>
        ) : (
          <div>
            <Button onClick={() => setIsDisabled(false)} type="link">
              Edit
            </Button>
          </div>
        )}
      </Form>
    </div>
  );
}

export default UserEditInfo;
