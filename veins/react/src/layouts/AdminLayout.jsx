import React from "react";
import { Navigate } from "react-router-dom";
import { useStateContext } from "../ContextProvider";

export const AdminLayout = ({ children }) => {
  const { user } = useStateContext();
  if (user.role === "admin") {
    return <>{children}</>;
  } else {
    return <Navigate to="/pagenotfound" />;
  }
};
