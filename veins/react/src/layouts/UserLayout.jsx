import React from "react";
import { Navigate } from "react-router-dom";
import { useStateContext } from "../ContextProvider";

export const UserLayout = ({ children }) => {
  const { user } = useStateContext;
  if (user.role === "user" || user.role === "nurse" || user.role === "admin") {
    return <>{children}</>;
  } else {
    return <Navigate to="/" />;
  }
};
