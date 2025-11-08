import { ReactUserProfile } from "@neuctra/authix";
import React from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  //   const navigate = useNavigate();
  return (
    <div className="py-10">
      <ReactUserProfile />
    </div>
  );
};

export default ProfilePage;
