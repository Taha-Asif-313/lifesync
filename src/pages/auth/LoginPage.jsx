import { ReactUserLogin } from "@neuctra/authix";
import React from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <div className="py-20">
      <ReactUserLogin
        primaryColor="var(--primary)"
        logoUrl={"/logo.png"}
        signupUrl={"/signup"}
        onError={(err) => console.log(err)}
        onSuccess={() => navigate("/tasks")}
      />
    </div>
  );
};

export default LoginPage;
