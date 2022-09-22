import { Avatar, Divider, Tag } from "antd";
import React from "react";
import { Card, Col, Row } from "react-bootstrap";

function FilmDetails() {
  return (
    <div>
      <Divider orientation="center"> Film Cast </Divider>
      <Row>
        <Col xs={2} sm={2} md={2} xl={2} lg={2}>
          <Tag>
            <Avatar
              size={32}
              src="https://feeds.abplive.com/onecms/images/uploaded-images/2021/09/06/37e8c19810ba659cdd9e88e4f1b2c85d_original.jpg"
            />
            {`Actor's Name`}
          </Tag>
        </Col>
      </Row>
    </div>
  );
}

export default FilmDetails;
