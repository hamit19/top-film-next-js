import { Form, Input, Select } from "antd";
import axios from "axios";
import React from "react";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import Uploader from "../../../upload/Uploader";

function EditFilmsData({ filmData }) {
  const [form] = Form.useForm();
  const { name, condition, content, imdb_score, imdb_link } = filmData;

  const handleOnFinish = (values) => {
    axios
      .patch("/api/admin/films/update", {
        values: { ...values, film_id: filmData._id },
      })
      .then((res) => {
        res.status === 200 &&
          toast.success(" Grate! Film data have changed successfully!");
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
        className={"w-100"}
        form={form}
        initialValues={{
          name: name,
          condition: condition,
          content: content,
          imdb_score: imdb_score,
          imdb_link: imdb_link,
        }}
        onFinish={(values) => handleOnFinish(values)}
        layout="vertical"
      >
        <Form.Item
          className={"w-100"}
          name="name"
          label="Title"
          rules={[
            { required: true, message: "The title field can not be empty!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className={"w-100"}
          name="condition"
          label="Condition"
          rules={[
            {
              required: true,
              message: "The condition field can not be empty!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className={"w-100"}
          name="content"
          label="Content"
          rules={[
            { required: true, message: "The content field can not be empty!" },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          className={"w-100"}
          name="imdb_score"
          label="IMDB Score"
          rules={[
            {
              required: true,
              message: "The IMDB Score field can not be empty!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className={"w-100"}
          name="imdb_link"
          label="IMDB Link"
          rules={[
            {
              required: true,
              message: "The IMDB link field can not be empty!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item className={"w-100"} name="poster" label="Poster">
          <Uploader
            key={"poster"}
            img
            afterUpload={(value) => {
              form.setFieldsValue({ poster: value[0]._id });
            }}
          />
        </Form.Item>
        <Form.Item className={"w-100"} name="video" label="Video">
          <Uploader
            key={"video"}
            video
            afterUpload={(value) => {
              form.setFieldsValue({ video: value[0]._id });
            }}
          />
        </Form.Item>

        <Button type="submit" variant="primary">
          Submit Changes
        </Button>
      </Form>
    </div>
  );
}

export default EditFilmsData;
