import React from "react";
import { useRouter } from "next/router";
import { Nav } from "react-bootstrap";
import Link from "next/Link";

const ActiveLink = ({ children, href }) => {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();

    if (href === "") {
      router.push("/");
    } else {
      router.push(href);
    }
  };

  const activeLinkHandel = () => {
    if (router.asPath.split("/")[1] == href) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Link href={href}>
      <Nav.Link href={href} onClick={handleClick} active={activeLinkHandel()}>
        {children}
      </Nav.Link>
    </Link>
  );
};

export default ActiveLink;
