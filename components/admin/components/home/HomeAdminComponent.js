import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import Styles from "./HomeAdiminComponent.module.css";
import axios from "axios";
import useSWR from "swr";

function HomeAdminComponent() {
  const fetcher = (url) => axios.get(url).then((res) => res.data);

  const { data, error } = useSWR("/api/admin/home/count", fetcher);

  return (
    <Row className={Styles.row}>
      <Col xl={3} lg={6} md={6} sm={12} xs={12}>
        <Card
          style={{
            marginTop: "1rem",
            textAlign: "center",
            minHeight: "200px",
          }}
          text="light"
          bg="success"
        >
          <Card.Header>Count of Users</Card.Header>
          <Card.Body>
            {
              <div>
                {error && !data ? (
                  <h5 style={{ color: "#fff" }}>Something went wrong!</h5>
                ) : !data ? (
                  <h5 style={{ color: "#fff" }}> Loading... </h5>
                ) : (
                  <>
                    <h5 style={{ color: "#fff" }}> {data.users} </h5>
                    <h6 style={{ color: "#fff" }}>Users</h6>
                  </>
                )}
              </div>
            }
          </Card.Body>
        </Card>
      </Col>
      <Col xl={3} lg={6} md={6} sm={12} xs={12}>
        <Card
          style={{
            marginTop: "1rem",
            textAlign: "center",
            minHeight: "200px",
          }}
          text="light"
          bg="primary"
        >
          <Card.Header>Count of Films</Card.Header>
          <Card.Body>Card number 2</Card.Body>
        </Card>
      </Col>
      <Col xl={3} lg={6} md={6} sm={12} xs={12}>
        <Card
          style={{
            marginTop: "1rem",
            textAlign: "center",
            minHeight: "200px",
          }}
          text="light"
          bg="danger"
        >
          <Card.Header>Next version</Card.Header>
          <Card.Body>Coming soon...</Card.Body>
        </Card>
      </Col>
      <Col xl={3} lg={6} md={6} sm={12} xs={12}>
        <Card
          style={{
            marginTop: "1rem",
            textAlign: "center",
            minHeight: "200px",
          }}
          text="light"
          bg="dark"
        >
          <Card.Header>Next version</Card.Header>
          <Card.Body> Coming soon... </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default HomeAdminComponent;
