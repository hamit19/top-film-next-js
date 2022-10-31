import { Form, Input, Select, Switch } from "antd";
import axios from "axios";
import React from "react";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";

const { Option } = Select;

function EditUserData({ userData }) {
  const { role, sub, username } = userData;

  const handleOnFinish = (values) => {
    axios
      .patch("/api/admin/users/update", { values, user_id: userData._id })
      .then((res) => {
        res.status === 200 &&
          toast.success(" Grate! Users data have changed successfully!");
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.errorMessage
            ? err?.response?.data?.errorMessage
            : "Something went wrong!"
        );
      });
  };

  return (
    <div>
      <Form
        initialValues={{ username: username, sub: sub, role: role }}
        onFinish={(values) => handleOnFinish(values)}
        layout="vertical"
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[
            { required: true, message: "The username field con not be empty!" },
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
          <Input />
        </Form.Item>
        <Form.Item
          name="role"
          label="Role"
          rules={[
            { required: true, message: "The users role have to be specified!" },
          ]}
        >
          <Select placeholder="Select the Role of the User" allowClear>
            <Option value="admin">Admin</Option>
            <Option value="user">Just User</Option>
          </Select>
        </Form.Item>
        <Form.Item name="sub" valuePropName="checked" label="Subscription">
          <Switch />
        </Form.Item>
        <Button type="submit" variant="primary">
          Submit Changes
        </Button>
      </Form>
    </div>
  );
}

export default EditUserData;
