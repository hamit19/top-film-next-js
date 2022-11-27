import { Badge, Modal, Table } from "antd";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import useSWR from "swr";
import MainLoader from "../../../loaderSpinner/MainLoader";
import EditFilmsData from "./EditFilmsData";

function FilmListAdminComponent() {
  const [activePage, setActivePage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [tableData, setTableData] = useState();
  const [count, setCount] = useState(0);

  const { error } = useSWR("/api/admin/films/", (url) =>
    axios.get(url, { params: { page: activePage, pageSize } }).then((res) => {
      setTableData(res.data.data);
      setCount(res.data.count);
      console.log(res.data);
    })
  );

  const handleEditUserData = (record) => {
    return Modal.info({
      title: "Edit Film info",
      content: <EditFilmsData filmData={record} />,
      okText: "Close",
      okType: "danger",
      className: "w-75",
    });
  };

  const handlePaginationChanges = (page, pageSize) => {
    axios
      .get("/api/admin/films/", { params: { page, pageSize } })
      .then((res) => {
        setTableData(res.data.users);
        setCount(res.data.count);
      });
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Condition",
      dataIndex: "condition",
      key: "condition",
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "IMDB Score",
      dataIndex: "imdb_score",
      key: "imdb_score",
    },
    {
      title: "IMDB Link",
      dataIndex: "imdb_link",
      key: "imdb_link",
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

export default FilmListAdminComponent;
