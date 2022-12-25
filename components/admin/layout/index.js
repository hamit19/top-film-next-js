import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  HomeOutlined,
  PaperClipOutlined,
  SlidersOutlined,
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
  const [filmsCount, setFilmsCount] = useState(0);

  const [activeComponent, setActiveComponent] = useState(
    <HomeAdminComponent />
  );

  const menuItems = [
    {
      key: "Home",
      label: "Home",
      icon: <HomeOutlined />,
      component: <HomeAdminComponent filmsCount={filmsCount} />,
    },
    {
      key: "users_list",
      label: "Users List",
      icon: <UserOutlined />,
      component: <Users />,
    },
    {
      key: "videos_list",
      label: "Videos list",
      icon: <VideoCameraOutlined />,
      component: <Films setFilmsCount={setFilmsCount} />,
    },
    {
      key: "banners_list",
      label: "Banners List",
      icon: <PaperClipOutlined />,
      component: <Users />,
    },
    {
      key: "sliders_list",
      label: "Sliders List",
      icon: <SlidersOutlined />,
      component: <Films setFilmsCount={setFilmsCount} />,
    },
    {
      key: "create_move",
      label: "Create Move",
      icon: <UploadOutlined />,
      component: <CreateMedia />,
    },
    {
      key: "create_banner",
      label: "Create Banner",
      icon: <UploadOutlined />,
      component: <CreateMedia />,
    },
    {
      key: "create_slider",
      label: "Create Slider",
      icon: <UploadOutlined />,
      component: <CreateMedia />,
    },
  ];

  const detectComponents = (e) => {
    const { key } = e;

    const foundedItem = menuItems.find((item) => item.key === key);

    const { component } = foundedItem;

    setActiveComponent(component);
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
