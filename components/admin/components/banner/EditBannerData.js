import { Form, Input, Select, Switch } from "antd";
import axios from "axios";
import React from "react";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import Uploader from "../../../upload/Uploader";
import Search from "../../../searchComponent/Search";

function EditFilmsData({ bannerData, setUpdatedList }) {
  const [form] = Form.useForm();
  const { show, banner } = bannerData;

  const handleOnFinish = (values) => {
    axios
      .patch("/api/admin/banners/update", {
        values: { ...values, bannerId: bannerData._id },
      })
      .then((res) => {
        res.status === 200 &&
          toast.success(" Great! Banner data have changed successfully!");

        setUpdatedList(res.data.data.banners);
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
        className={"w-40"}
        form={form}
        initialValues={{ show: show, banner: banner }}
        onFinish={(values) => handleOnFinish(values)}
        layout='vertical'
      >
        <Form.Item
          className={"w-100"}
          name='film'
          label='Films name'
          rules={[{ required: true, message: " Please select a film! " }]}
        >
          <Search
            getValue={(value) => form.setFieldsValue({ film: value })}
            initialValues={bannerData?.film}
          />
        </Form.Item>

        <Form.Item
          className={"w-100"}
          name='banner'
          label='Banner'
          rules={[
            {
              required: true,
              message: " You should upload the films banner first!",
            },
          ]}
        >
          <Uploader
            key={"Banner"}
            img
            afterUpload={(value) => {
              form.setFieldsValue({ banner: value[0]._id });
            }}
          />
        </Form.Item>

        <Form.Item
          className={"w-100"}
          name='show'
          valuePropName='checked'
          label='Display status'
        >
          <Switch onChange={(value) => form.setFieldsValue({ show: value })} />
        </Form.Item>

        <Button type='submit' variant='primary'>
          Submit Changes
        </Button>
      </Form>
    </div>
  );
}

export default EditFilmsData;
