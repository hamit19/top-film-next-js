import { useRouter } from "next/router";
import React, { useContext } from "react";
import AuthForm from "../../components/auth/AuthForm";
import { AuthContext } from "../../context/auth";

const Auth = () => {
  const router = useRouter();
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated()) {
    router.push("/");
  }

  return (
    <div>
      <AuthForm />
    </div>
  );
};

export default Auth;
