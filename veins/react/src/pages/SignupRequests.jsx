import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
import { SmallLoading } from "../components/SmallLoading";
import { useStateContext } from "../ContextProvider";
import { SmallHeader } from "../components/SmallHeader";

export const SignupRequests = () => {
  const [signupRequests, setSignupRequests] = useState([]);
  const [smallLoading, setSmallLoading] = useState(false);
  const { notification, setNotification } = useStateContext();

  useEffect(() => {
    setSmallLoading(true);
    axiosClient
      .get("/signuprequests")
      .then(({ data }) => {
        setSignupRequests(data);
        setSmallLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setSmallLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />

      <SmallHeader title={"Signup Requests"} />

      <div className="signup-requests">
        <h2>Nurse Signup Requests</h2>
        {notification && (
          <div className="notification fadeInDown">{notification}</div>
        )}
        {smallLoading ? (
          <SmallLoading />
        ) : (
          signupRequests &&
          signupRequests.map((data) => (
            <Link
              key={data.id}
              to={`/signuprequests/${data.id}`}
              className="signup-request"
            >
              <div>Name: {data.name}</div>
              <div>Email: {data.email}</div>
            </Link>
          ))
        )}
      </div>

      <Footer />
    </>
  );
};
