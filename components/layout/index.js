import { Button, Container, Nav, Navbar } from "react-bootstrap";
import Styles from "./Layout.module.css";
import ActiveLink from "../activeLink/ActiveLink";
import Link from "next/Link";

const index = ({ children, darkMode, setDarkMode }) => {
  return (
    <>
      <Navbar
        bg={darkMode ? "dark" : "light"}
        variant={darkMode ? "dark" : "light"}
        className={Styles.nav_bar}
      >
        <Container>
          <Link href="/">
            <Navbar.Brand className={Styles.Brand} href="/">
              FilmTop
            </Navbar.Brand>
          </Link>
          <Nav className="me-auto">
            <ActiveLink href="">Home</ActiveLink>
            <ActiveLink href="films">Films</ActiveLink>
            {/* <ActiveLink href="/anime">Anime</ActiveLink> */}
          </Nav>
          <Button className={Styles.auth_btn}>Log In</Button>
        </Container>
      </Navbar>
      <main>{children}</main>
    </>
  );
};

export default index;
