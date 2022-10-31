import { Badge, Modal, Table } from "antd";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import useSWR from "swr";
import MainLoader from "../../../loaderSpinner/MainLoader";
import EditUserData from "./EditUserData";

function Users() {
  const [activePage, setActivePage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [tableData, setTableData] = useState();
  const [count, setCount] = useState(0);

  const { error } = useSWR("/api/admin/users/getUsers", (url) =>
    axios.get(url, { params: { page: activePage, pageSize } }).then((res) => {
      setTableData(res.data.users);
      setCount(res.data.count);
    })
  );

  const handleEditUserData = (record) => {
    return Modal.info({
      title: "Edit Users Data",
      content: <EditUserData userData={record} />,
      okText: "Close",
      okType: "danger",
    });
  };

  const handlePaginationChanges = (page, pageSize) => {
    axios
      .get("/api/admin/users/getUsers", { params: { page, pageSize } })
      .then((res) => {
        setTableData(res.data.users);
        setCount(res.data.count);
      });
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Rule",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Sub",
      dataIndex: "sub",
      key: "sub",
      render: (sub) => (
        <>
          <Badge
            text={sub ? "Active" : "Inactive"}
            status={sub ? "success" : "error"}
          />
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <>
          <Button
            onClick={() => handleEditUserData(record)}
            variant="danger"
            style={{ fontSize: "10px" }}
            type="text"
          >
            Edit
          </Button>
        </>
      ),
    },
  ];

  if (!tableData) return <MainLoader />;

  if (error)
    return (
      <div>
        <h1>Something went wrong!</h1>
        <h3>Please Reload the page!</h3>
      </div>
    );

  return (
    <div style={{ width: "100%", height: "100%", padding: "1rem" }}>
      <Table
        pagination={{
          pageSize: pageSize,
          onChange: (page, pageSize) => {
            setActivePage(page);
            setPageSize(pageSize);
            handlePaginationChanges(page, pageSize);
          },
          total: count,
        }}
        rowKey={(record) => record._id}
        dataSource={tableData}
        columns={columns}
      />
      ;
    </div>
  );
}

export default Users;
