import React from "react";
import { useStateContext } from "../ContextProvider";
import pagenotfound from "../images/pagenotfound.avif";

export const NurseOrAdminPermission = ({ children }) => {
  const { user } = useStateContext();
  if (user.role === "nurse" || user.role === "admin") {
    return <>{children}</>;
  } else {
    return (
      <>
        <div className="pageNotFound">
          <img className="pageNotFoundImage" src={pagenotfound} />
        </div>
      </>
    );
  }
};
