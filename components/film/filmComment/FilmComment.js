import React, { useState } from "react";
import { Comment, Avatar, Form, Button, List, Input, Divider } from "antd";
import { Card } from "react-bootstrap";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment/moment";

const Editor = ({ onChange, onSubmit, value, submitting }) => {
  return (
    <div>
      <Form.Item>
        <TextArea
          rows={4}
          placeholder="Leave a comment..."
          onChange={onChange}
          value={value}
          style={{ borderRadius: "5px !important", paddingTop: "10px" }}
        />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          loading={submitting}
          onClick={onSubmit}
          type="primary"
        >
          Submit
        </Button>
      </Form.Item>
    </div>
  );
};

const CommentList = ({ comments }) => {
  return (
    <List
      dataSource={comments}
      header={`${comments.length} comments`}
      itemLayout="horizontal"
      renderItem={(props) => <Comment {...props} />}
    />
  );
};

function FilmComment() {
  const [value, setValue] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [comments, setComments] = useState([]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!value) return alert("Please write a comment");

    setSubmitting(true);

    setTimeout(() => {
      setComments([
        ...comments,
        {
          id: new Date().getTime(),
          author: "User number 1",
          avatar:
            "https://image.stern.de/31941810/t/K0/v1/w1440/r1.7778/-/11--sorge-um-seinen-gesundheitszustand-waechst---16-9---spoton-article-1023930.jpg",
          content: <p style={{ textAlign: "justify" }}> {value} </p>,
          datetime: moment().fromNow(),
        },
      ]);
      setSubmitting(false);
      setValue("");
    }, 1000);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <Card className="mt-5">
        <Card.Body>
          <Divider orientation="center">Comments</Divider>
          <div className="w-100">
            {comments.length > 0 && <CommentList comments={comments} />}
          </div>
          <Comment
            content={
              <Editor
                onChange={handleChange}
                onSubmit={handleSubmit}
                submitting={submitting}
                value={value}
              />
            }
          />
        </Card.Body>
      </Card>
    </div>
  );
}

export default FilmComment;
