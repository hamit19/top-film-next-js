import React from "react";
import { Button, Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import Styles from "./Layout.module.css";
import ActiveLink from "../activeLink/ActiveLink";
import Link from "next/Link";
import { FiMoon } from "react-icons/fi";
import { RiSunLine } from "react-icons/ri";

const index = ({ children, darkMode, setDarkMode, customize }) => {
  if (customize) {
    return <div>{children}</div>;
  } else {
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
              <Link href={"/auth"}>
                <Button className={Styles.auth_btn}>Log In</Button>
              </Link>
            </div>
          </Container>
        </Navbar>
        <main>{children}</main>
      </>
    );
  }
};

export default index;
