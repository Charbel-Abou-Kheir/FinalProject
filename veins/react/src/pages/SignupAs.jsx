import React from "react";
import { Navbar } from "../components/Navbar";
import { Link } from "react-router-dom";

export const SignupAs = () => {
  return (
    <>
      <Navbar />
      <div className="signupas">
        <div className="form fadeInDown">
          <div className="content">
            <h1 className="title">Signup as a...</h1>
            <Link to="/signupuser" className="btn">
              User
            </Link>
            <Link to="/signupnurse" className="btn">
              Nurse
            </Link>
            <p className="message">
              Already Registered? <Link to="/login">Sign in.</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
