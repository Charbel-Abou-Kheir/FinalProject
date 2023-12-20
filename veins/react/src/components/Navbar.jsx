import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import { useStateContext } from "../ContextProvider";
import axiosClient from "../axios-client";

export const Navbar = () => {
  const { setUser, user, setToken, token } = useStateContext();
  const [accordion1, setAccordion1] = useState(false);
  const [accordion2, setAccordion2] = useState(false);
  const [active, setActive] = useState(false);
  const navigate = useNavigate();

  const activeMenu = () => {
    setActive(!active);
  };

  const handleClick1 = (divName) => {
    setAccordion1(!accordion1);
    if (accordion2 === true) {
      setAccordion2(!accordion2);
    }
  };
  const handleClick2 = (divName) => {
    setAccordion2(!accordion2);
    if (accordion1 === true) {
      setAccordion1(!accordion1);
    }
  };

  const onLogout = (e) => {
    e.preventDefault();

    axiosClient.post("/logout").then(() => {
      setUser({});
      setToken(null);
      navigate("/");
    });
  };

  useEffect(() => {
    if (token) {
      axiosClient.get("/user").then(({ data }) => {
        setUser(data);
      });
    }
  }, [token]);

  return (
    <>
      <div className="navbar">
        <Link to="/" className="logo">
          <img src={logo} alt="VEINS" />
        </Link>
        <div className={active ? "navMobile active" : "navMobile"}>
          <i onClick={activeMenu} className="fa-solid fa-xmark close"></i>
          <a className="navAccordion" onClick={handleClick1}>
            ABOUT US
            <i
              className={
                accordion1
                  ? "fa-solid fa-chevron-down active"
                  : "fa-solid fa-chevron-down"
              }
            ></i>
            <div className={accordion1 ? "accordion active" : "accordion"}>
              <div>
                <Link to="/mission">MISSION</Link>
                <Link to="/leaderboard">LEADERBOARD</Link>
              </div>
            </div>
          </a>
          {user && user.role === "admin" && (
            <a className="navAccordion" onClick={handleClick2}>
              MANAGE USERS
              <i
                className={
                  accordion2
                    ? "fa-solid fa-chevron-down active"
                    : "fa-solid fa-chevron-down"
                }
              ></i>
              <div className={accordion2 ? "accordion active" : "accordion"}>
                <div>
                  <Link to="/signuprequests">SIGNUP REQUESTS</Link>
                  <Link to="/users">USERS</Link>
                </div>
              </div>
            </a>
          )}
          {user && user.role === "nurse" && (
            <a className="navAccordion" onClick={handleClick2}>
              MANAGE USERS
              <i
                className={
                  accordion2
                    ? "fa-solid fa-chevron-down active"
                    : "fa-solid fa-chevron-down"
                }
              ></i>
              <div className={accordion2 ? "accordion active" : "accordion"}>
                <div>
                  <Link to="/expecteddonors">EXPECTED DONORS</Link>
                  <Link to="/users">USERS</Link>
                </div>
              </div>
            </a>
          )}
          <Link to="/posts">POSTS</Link>
          <Link to="/contactus">CONTACT US</Link>
        </div>
        {token ? (
          <>
            <Link to="/manageposts" className="loggedIn signup">
              <i className="fa-solid fa-gear user"></i>
            </Link>
            <Link to="/profile" className="loggedIn">
              <i className="fa-solid fa-circle-user user"></i>
            </Link>
            <a className="logout" onClick={onLogout}>
              LOGOUT
            </a>
          </>
        ) : (
          <>
            <Link to="/signup" className="signup">
              SIGN UP
            </Link>
            <Link to="/login" className="login">
              LOGIN
            </Link>
          </>
        )}
        <i onClick={activeMenu} className="fa-solid fa-bars burger"></i>
      </div>
    </>
  );
};
