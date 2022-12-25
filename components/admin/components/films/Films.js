import { Badge, Modal, Table } from "antd";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import useSWR from "swr";
import MainLoader from "../../../loaderSpinner/MainLoader";
import EditFilmsData from "./EditFilmsData";
import { toast } from "react-toastify";

function FilmListAdminComponent({ setFilmsCount }) {
  const [activePage, setActivePage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [tableData, setTableData] = useState();
  const [count, setCount] = useState(0);

  const { error } = useSWR("/api/admin/films/", (url) =>
    axios.get(url, { params: { page: activePage, pageSize } }).then((res) => {
      setTableData(res.data.data);
      setCount(res.data.count);
      setFilmsCount(res.data.count.count);
      console.log(res.data);
    })
  );

  const handleEditFilmData = (record) => {
    return Modal.info({
      title: "Edit Film info",
      content: <EditFilmsData filmData={record} />,
      okText: "Close",
      okType: "danger",
      className: "w-75",
    });
  };

  const handleDeleteFilm = (id) => {
    return Modal.confirm({
      title: "Delete the film",
      content:
        "Are you sure you want to delete this film?! if you are click on Delete button.",
      cancelText: "Cancel",
      okText: "Delete",
      okType: "danger",
      onOk: () => {
        axios
          .delete("/api/admin/films/delete", { params: { id } })
          .then((res) => {
            res.status === 200 &&
              toast.success("The film has deleted successfully!");

            console.log(res.data);

            setTableData(res.data.data);
            setFilmsCount(res.data.filmsCount);
          })
          .catch((err) => {
            toast.error(
              err?.response?.data?.messageError
                ? err?.response?.data?.messageError
                : "Something went wrong please try again!"
            );
          });
      },
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
            onClick={() => handleEditFilmData(record)}
            variant="primary"
            style={{ fontSize: "10px" }}
            type="text"
          >
            Edit
          </Button>
        </>
      ),
    },
    {
      title: "Action",
      key: "action2",
      render: (text, record) => (
        <>
          <Button
            onClick={() => handleDeleteFilm(record._id)}
            variant="danger"
            style={{ fontSize: "10px" }}
            type="text"
          >
            Delete
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
    </div>
  );
}

export default FilmListAdminComponent;
