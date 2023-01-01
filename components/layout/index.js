import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import Styles from "./Layout.module.css";
import ActiveLink from "../activeLink/ActiveLink";
import Link from "next/Link";
import { FiMoon } from "react-icons/fi";
import { RiSunLine } from "react-icons/ri";
import { useContext } from "react";
import { AuthContext, AuthContextDispatcher } from "../../context/auth";
import { Avatar, Badge, Dropdown, Menu } from "antd";

import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Footer from "../footer/Footer";

const Layout = ({ children, darkMode, setDarkMode, customize }) => {
  const { isAuthenticated, authState } = useContext(AuthContext);
  const setAuthState = useContext(AuthContextDispatcher);

  const router = useRouter();

  const logOutHandler = async () => {
    const { data } = await axios.get("/api/auth/logout");

    data.loggedOut && setAuthState(null);

    data.loggedOut && toast.warning(`You've logged out!`);

    router.push("/");
  };

  const menu = () => {
    const items = [
      {
        key: "1",
        label: (
          <Link
            href="/user/[username]"
            as={`/user/${authState?.user?.username}`}
          >
            Profile
          </Link>
        ),
      },
      {
        key: "2",
        label: (
          <p style={{ margin: "0" }} onClick={() => logOutHandler()}>
            Log Out
          </p>
        ),
      },
    ];

    return <Menu className={Styles.avatar_menu} items={items} />;
  };

  return (
    <>
      <Navbar
        bg={darkMode ? "dark" : "light"}
        variant={darkMode ? "dark" : "light"}
        className={Styles.nav_bar}
      >
        <Container>
          <Link href="/">
            <Navbar.Brand
              className={darkMode ? Styles.Brand : Styles.Brand_light}
              href="/"
            >
              TopFilm
            </Navbar.Brand>
          </Link>
          <Nav className="me-auto">
            <ActiveLink href="/" as="/">
              Home
            </ActiveLink>
            <ActiveLink href="/films" as={"/films"}>
              Films
            </ActiveLink>
            {/* <ActiveLink href="/anime">Anime</ActiveLink> */}
          </Nav>
          <div className={Styles.nav_bar_actions_wrapper}>
            {darkMode ? (
              <RiSunLine
                style={{ cursor: "pointer" }}
                size={20}
                color={"#fff"}
                onClick={() => {
                  setDarkMode(false);
                }}
              />
            ) : (
              <FiMoon
                style={{ cursor: "pointer" }}
                size={20}
                onClick={() => {
                  setDarkMode(true);
                }}
              />
            )}
            {isAuthenticated() ? (
              <Dropdown trigger={["click"]} overlay={menu()}>
                <Badge dot status={authState?.user?.sub ? "success" : "error"}>
                  <Avatar
                    src={authState?.user?.profilePhoto}
                    style={{ cursor: "pointer" }}
                  />
                </Badge>
              </Dropdown>
            ) : (
              <Link href={"/auth"}>
                <Button className={Styles.auth_btn}>Log In</Button>
              </Link>
            )}
          </div>
        </Container>
      </Navbar>
      <main>{children}</main>
      {!customize && <Footer />}
    </>
  );
};

export default Layout;
