import React, { useContext, useEffect } from "react";
import { Col, Row } from "antd";
import UserCard from "../../components/profile/userCard/UserCard";
import UserEditInfo from "../../components/profile/userEditInfo/UserEditInfo";
import { AuthContext } from "../../context/auth";
import MainLoader from "../../components/loaderSpinner/MainLoader";
import { Container } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

function Profile({ username }) {
  const { authState } = useContext(AuthContext);
  // const [userInfo, setUserInfo] = useState({});
  const router = useRouter();

  const checkingTheUsername = () => {
    authState.user.username !== username && router.push("/error/_403error");
  };

  // useEffect(() => {
  //   try {
  //     axios.get(`/api/user/${username}`).then((res) => {
  //       setUserInfo(res?.data);
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, []);

  if (!authState) {
    return <MainLoader />;
  }

  if (authState?.user?.username === username) {
    return (
      <>
        <Head>
          <title>Profile | TopFilm</title>
        </Head>
        <Container>
          <Row style={{ paddingTop: "5rem" }} justify={"center"}>
            <Col xs={24} sm={24} md={12} lg={9} xl={9}>
              <UserCard user={authState?.user} />
            </Col>

            <Col xs={24} sm={24} md={12} lg={15} xl={15}>
              <UserEditInfo
                username={authState?.user?.username}
                email={authState?.user?.email}
              />
            </Col>
          </Row>
        </Container>
      </>
    );
  }

  if (authState?.user?.username !== username) {
    checkingTheUsername();
  }
}

export const getServerSideProps = async (context) => {
  const { username } = context.query;

  return {
    props: {
      username,
    },
  };
};

export default Profile;
