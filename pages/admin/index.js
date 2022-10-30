import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import AdminLayout from "../../components/admin/layout";
import MainLoader from "../../components/loaderSpinner/MainLoader";
import { AuthContext } from "../../context/auth";

function AdminPanel() {
  const { authState } = useContext(AuthContext);

  const router = useRouter();

  const checkingTheRole = () => {
    authState.user.role !== "admin" && router.push("/error/_403error");
  };

  if (!authState) return <MainLoader />;

  if (authState?.user?.role !== "admin") {
    checkingTheRole();
  }

  if (authState?.user?.role === "admin") {
    return (
      <div style={{ overflow: "hidden", width: "100%", height: "100%" }}>
        <Head>
          <title>Admin-panel | topFilm</title>
        </Head>
        <AdminLayout username={authState?.user?.username} />
      </div>
    );
  }
}

export default AdminPanel;
