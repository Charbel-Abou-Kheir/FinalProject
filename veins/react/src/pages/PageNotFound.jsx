import React from "react";
import pagenotfound from "../images/pagenotfound.avif";

export const PageNotFound = () => {
  return (
    <>
      <div className="pageNotFound">
        <img className="pageNotFoundImage" src={pagenotfound} />
      </div>
    </>
  );
};
