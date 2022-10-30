import React from "react";
import Link from "next/Link";
import { Typography } from "antd";

const { Paragraph } = Typography;

function AdminCard() {
  return (
    <Typography>
      <Paragraph>
        <ul>
          <li>
            <Link href="/admin"> Admin panel </Link>
          </li>
          <li>
            <Link href="#">......</Link>
          </li>
          <li>
            <Link href="#">......</Link>
          </li>
        </ul>
      </Paragraph>
    </Typography>
  );
}

export default AdminCard;
