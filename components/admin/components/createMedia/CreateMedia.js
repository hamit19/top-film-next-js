import { Form, Input, InputNumber } from "antd";
import axios from "axios";
import moment from "moment";
import React from "react";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import Uploader from "../../../upload/Uploader";
import Styles from "./createMedia.module.css";

function CreateMedia() {
  const [form] = Form.useForm();

  const handleOnFinish = (values) => {
    axios
      .post("/api/admin/films/create", { ...values })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Grate!, the film has made successfully!");
          form.resetFields();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={Styles.main_wrapper}>
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => handleOnFinish(values)}
      >
        <Form.Item
          rules={[
            { required: true, message: "Please enter the name of the film!" },
          ]}
          name="name"
          label="Film's Name"
        >
          <Input />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "This field can not be empty!" }]}
          label="The best quality of the film"
          name="quality"
        >
          <Input />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "This field can not be empty!" }]}
          label="IMDB link for the film"
          name="IMDBLink"
        >
          <Input />
        </Form.Item>

        <Form.Item
          rules={[{ required: true, message: "This field can not be empty!" }]}
          label="IMDB score for the film"
          name="IMDBScore"
        >
          <Input />
        </Form.Item>

        <Form.Item
          rules={[{ required: true, message: "This field can not be empty!" }]}
          label="Genre"
          name="genre"
        >
          <Input />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "This field can not be empty!" }]}
          label="Age classification"
          name="ageClassification"
        >
          <Input />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "This field can not be empty!" }]}
          label="Director"
          name="director"
        >
          <Input />
        </Form.Item>

        <Form.Item
          rules={[{ required: true, message: "This field can not be empty!" }]}
          label="Writer"
          name="writer"
        >
          <Input />
        </Form.Item>

        <Form.Item
          rules={[{ required: true, message: "This field can not be empty!" }]}
          label="actors"
          name="actors"
        >
          <Input />
        </Form.Item>

        <Form.Item
          rules={[{ required: true, message: "This field can not be empty!" }]}
          label="production of"
          name="productionOf"
        >
          <Input />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "This field can not be empty!" }]}
          label="Release Date"
          name="releaseDate"
        >
          <InputNumber
            className="w-100"
            min={1500}
            max={parseInt(moment(new Date()).format("YYYY")) + 2}
          />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "This field can not be empty!" }]}
          label="Time (min)"
          name="time"
        >
          <InputNumber className="w-100" min={0} />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "This field can not be empty!" }]}
          label="Condition"
          name="condition"
        >
          <Input />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "This field can not be empty!" }]}
          label="Synopsis"
          name="content"
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="Upload Poster"
          name="poster"
          rules={[
            {
              required: true,
              message: "Please upload the poster of the film first!",
            },
          ]}
        >
          <Uploader
            key="poster"
            img
            afterUpload={(value) => {
              form.setFieldsValue({ poster: value[0]._id });
            }}
          />
        </Form.Item>
        <Form.Item
          label="Upload Film"
          name="film"
          rules={[
            {
              required: true,
              message: "Please upload the film first!",
            },
          ]}
        >
          <Uploader
            key="video"
            video
            afterUpload={(value) => {
              form.setFieldsValue({ film: value[0]._id });
            }}
          />
        </Form.Item>
        <Button type="submit" variant="success">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default CreateMedia;
