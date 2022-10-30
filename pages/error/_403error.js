import Image from "next/image";
import React from "react";
import Styles from "./_403error.module.css";

import ErrorVictor from "../../util/_403error.svg";
import Button from "react-bootstrap/Button";
import Link from "next/link";
import Head from "next/head";

function _403error() {
  return (
    <div className={Styles.main_wrapper}>
      <Head>
        <title> 403 Page | topFilm</title>
      </Head>
      <Image
        src={ErrorVictor}
        width={400}
        height={400}
        alt="403_Forbidden_Error!"
      />
      <h4>Sorry, You Can Not Access This Page!</h4>
      <Button>
        <Link href="/" as="/">
          Get Back to Home
        </Link>
      </Button>
    </div>
  );
}

export default _403error;
