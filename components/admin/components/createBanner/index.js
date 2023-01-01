import { Form, Input, InputNumber, Switch } from "antd";
import axios from "axios";
import moment from "moment";
import React from "react";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import Search from "../../../searchComponent/Search";
import Uploader from "../../../upload/Uploader";
import Styles from "./createBanner.module.css";

function CreateBanner() {
  const [form] = Form.useForm();

  const handleOnFinish = async (values) => {
    try {
      await axios.post("/api/admin/home/banner", { ...values });

      toast.success("Grate!, the film has made successfully!");

      form.resetFields();
    } catch (err) {
      toast.error("Something went wrong! Please try again");
    }
  };

  return (
    <div className={Styles.main_wrapper}>
      <Form
        form={form}
        initialValues={{ show: false }}
        layout='vertical'
        onFinish={(values) => handleOnFinish(values)}
      >
        <Form.Item
          label='Select the movie'
          name='film'
          rules={[
            {
              required: true,
              message: "Please select the movie!",
            },
          ]}
        >
          <Search getValue={(value) => form.setFieldsValue({ film: value })} />
        </Form.Item>

        <Form.Item label='Status of the new banner' name='show'>
          <Switch onChange={(value) => form.setFieldsValue({ show: value })} />
        </Form.Item>

        <Form.Item
          label='Upload Banner'
          name='banner'
          rules={[
            {
              required: true,
              message: "Please upload the banner of the movie first!",
            },
          ]}
        >
          <Uploader
            key='banner'
            img
            afterUpload={(value) => {
              form.setFieldsValue({ banner: value[0]._id });
            }}
          />
        </Form.Item>

        <Button type='submit' variant='success'>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default CreateBanner;
