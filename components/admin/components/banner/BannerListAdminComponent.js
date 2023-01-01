import { Badge, Modal, Table } from "antd";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import useSWR from "swr";
import MainLoader from "../../../loaderSpinner/MainLoader";
import EditBannerData from "./EditBannerData";
import { toast } from "react-toastify";
import moment from "moment";

function BannerListAdminComponent() {
  const [activePage, setActivePage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [tableData, setTableData] = useState();
  const [count, setCount] = useState(0);

  const { error } = useSWR("/api/admin/banners/", (url) =>
    axios.get(url, { params: { page: activePage, pageSize } }).then((res) => {
      console.log(res.data);
      setTableData(res.data.banners);
      setCount(res.data.count);
    })
  );

  console.log(error);

  const handleEditBannerData = (record) => {
    return Modal.info({
      title: "Edit Banner info",
      content: (
        <EditBannerData
          setUpdatedList={(list) => setTableData(list)}
          bannerData={record}
        />
      ),
      okText: "Close",
      okType: "danger",
      className: "w-75",
    });
  };

  const handleDeleteBanner = (id) => {
    return Modal.confirm({
      title: "Delete the Banner",
      content:
        "Are you sure you want to delete this Banner?! if you are click on Delete button.",
      cancelText: "Cancel",
      okText: "Delete",
      okType: "danger",
      onOk: () => {
        axios
          .delete("/api/admin/banners/delete", { params: { id } })
          .then((res) => {
            res.status === 200 &&
              toast.success("The Banner has deleted successfully!");

            setTableData(res.data.data.banners);
          })
          .catch((err) => {
            toast.error(
              err?.response?.data?.messageError
                ? err?.response?.data?.messageError
                : "Something went wrong please try again!"
            );
            console.log(err, "this is delete banner error log!");
          });
      },
    });
  };

  const handlePaginationChanges = (page, pageSize) => {
    axios
      .get("/api/admin/banners/", { params: { page, pageSize } })
      .then((res) => {
        setTableData(res.data.users);
        setCount(res.data.count);
      });
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "film",
      key: "film",
      render: (text) => <span>{text.name}</span>,
    },
    {
      title: "Created Date",
      dataIndex: "created",
      key: "created",
      render: (date) => <span> {moment(date).startOf("ss").fromNow()} </span>,
    },
    {
      title: "Display status",
      dataIndex: "show",
      key: "show",
      render: (show) =>
        show ? (
          <span className='text-success'> Published </span>
        ) : (
          <span className='text-danger'> Private </span>
        ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <>
          <Button
            onClick={() => handleEditBannerData(record)}
            variant='primary'
            style={{ fontSize: "10px" }}
            type='text'
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
            onClick={() => handleDeleteBanner(record._id)}
            variant='danger'
            style={{ fontSize: "10px" }}
            type='text'
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

export default BannerListAdminComponent;
