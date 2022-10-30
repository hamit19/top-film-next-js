import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import CreateMedia from "../components/createMedia/CreateMedia";
import Films from "../components/films/Films";
import HomeAdminComponent from "../components/home/HomeAdminComponent";
import Users from "../components/users/Users";
import Styles from "./adminLayout.module.css";
import classNames from "classnames";

const { Sider, Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(true);

  const [activeComponent, setActiveComponent] = useState(
    <HomeAdminComponent />
  );

  const menuItems = [
    {
      key: "1",
      icon: <HomeOutlined />,
      label: "Home",
      component: <HomeAdminComponent />,
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: "Users List",
      component: <Users />,
    },
    {
      key: "3",
      icon: <VideoCameraOutlined />,
      label: "Films List",
      component: <Films />,
    },
    {
      key: "4",
      icon: <UploadOutlined />,
      label: "Upload new film",
      component: <CreateMedia />,
    },
  ];

  const detectComponents = (e) => {
    const { key } = e;

    const foundedItem = menuItems.find((item) => item.key === key);

    setActiveComponent(foundedItem.component);
  };

  return (
    <Layout style={{ height: "90vh" }}>
      <Sider
        trigger={null}
        style={{
          backgroundColor: "#212529",
        }}
        collapsible
        collapsed={collapsed}
      >
        <Menu
          theme="dark"
          mode="inline"
          style={{ backgroundColor: "#212529" }}
          defaultSelectedKeys={["1"]}
          items={menuItems}
          onClick={(e) => detectComponents(e)}
        />
        {React.createElement(
          collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: Styles.trigger,
            onClick: () => setCollapsed(!collapsed),
          }
        )}
      </Sider>
      <Layout className={Styles.site_layout}>
        <Content
          className={classNames(
            Styles.site_layout_background,
            Styles.content_wrapper
          )}
          style={{
            padding: 24,
            height: "100%",
          }}
        >
          {activeComponent}
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;
