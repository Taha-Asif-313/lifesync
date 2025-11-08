import { ReactUserSignUp } from "@neuctra/authix";
import React from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();
  return (
    <div className="py-20">
      <ReactUserSignUp
        primaryColor="var(--primary)"
        logoUrl={"/logo.png"}
        loginUrl={"/login"}
        onError={(err) => console.log(err)}
        onSuccess={() => navigate("/tasks")}
      />
    </div>
  );
};

export default SignupPage;
