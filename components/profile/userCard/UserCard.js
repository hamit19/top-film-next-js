import React from "react";
import Styles from "./userCard.module.css";
import Image from "next/image";
import MainLoader from "../../loaderSpinner/MainLoader";
import { Avatar, Badge, Divider } from "antd";
import moment from "moment";
import { Card } from "react-bootstrap";

function UserCard(user) {
  if (!user) return <MainLoader />;

  const { username, email, sub, sub_time, profilePhoto, created } = user.user;

  return (
    <div className={Styles.card_wrapper}>
      <Card className={Styles.card}>
        <Card.Body className={Styles.card_body}>
          <div className={Styles.avatar_wrap}>
            <Avatar className={Styles.avatar} src={profilePhoto} size={90} />
          </div>
          <Divider>User Information</Divider>
          <ul className={Styles.user_info}>
            <li>{email}</li>
            <li>{username}</li>
            <li>
              Subscription Status: {"  "}
              <span>
                {sub ? (
                  <Badge status="success" text=" Active " />
                ) : (
                  <Badge status="error" text=" has expired" />
                )}
              </span>
            </li>
            {sub && (
              <li>
                Your subscription will be expired:{" "}
                <p> {moment(sub_time).endOf("ss").fromNow()} </p>
              </li>
            )}
          </ul>
        </Card.Body>
      </Card>
    </div>
  );
}

export default UserCard;
