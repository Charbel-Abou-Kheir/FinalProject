import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import { useStateContext } from "../ContextProvider";

export const Footer = () => {
  const { user } = useStateContext();

  return (
    <>
      <div className="footer">
        <div className="logoContainer">
          <Link to="/" className="logo">
            <img src={logo} alt="VEINS" />
          </Link>
        </div>
        <div className="links">
          <Link to="/mission">Mission</Link>
          <Link to="/leaderboard">Leaderboard</Link>
          {user.name && user.role === "admin" && (
            <>
              <Link to="signuprequests">Signup Requests</Link>
              <Link to="users">Users</Link>
            </>
          )}
          {user.name && user.role === "nurse" && (
            <>
              <Link to="expecteddonors">Expected Donors</Link>
              <Link to="users">Users</Link>
            </>
          )}
          <Link to="/posts">Posts</Link>
          <Link to="/contactus">Contact Us</Link>
          {!user.name && (
            <>
              <Link>Sign Up</Link>
              <Link className="login">Login</Link>
            </>
          )}
        </div>
        <div className="text">
          <p>
            A project by VEINS Foundation.
            <br /> Made with <i class="fa-solid fa-heart"></i> in Lebanon.
          </p>
        </div>
      </div>
    </>
  );
};
