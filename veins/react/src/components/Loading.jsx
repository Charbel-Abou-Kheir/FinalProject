import React from "react";

export const Loading = () => {
  return (
    <>
      <div className="loading fadeInDown">
        <i class="fa-solid fa-gear fa-spin fa-2xl gear1"></i>
        <i class="fa-solid fa-gear fa-spin fa-spin-reverse fa-2xl gear2"></i>
      </div>
    </>
  );
};
