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
    const mainHref = href.split("/")[1];
    const routerPath = router.asPath.split("/")[1];

    // if (href == " " && router.asPath == "/") return true;

    return routerPath === mainHref;
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
