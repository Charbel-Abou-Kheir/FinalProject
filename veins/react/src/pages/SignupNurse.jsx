import React, { useRef } from "react";
import { Navbar } from "../components/Navbar";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";
import { Loading } from "../components/Loading";
import { useStateContext } from "../ContextProvider";

export const SignupNurse = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const role = "nurse";
  let cv = "";
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();
  const [smallLoading, setSmallLoading] = useState(false);
  const { notification, setNotification } = useStateContext();

  const onSubmit = (e) => {
    e.preventDefault();

    const headers = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    const formData = new FormData();
    formData.append("name", nameRef.current.value);
    formData.append("email", emailRef.current.value);
    formData.append("role", role);
    formData.append("cv", cv);
    formData.append("password", passwordRef.current.value);
    formData.append(
      "password_confirmation",
      passwordConfirmationRef.current.value
    );

    setSmallLoading(true);
    axiosClient
      .post("/signuprequests", formData, headers)
      .then(() => {
        setSmallLoading(false);
        setNotification("Signup request sent wait for approval");
        navigate("/");
      })
      .catch((err) => {
        if (err.response) {
          setErrors(err.response.data.errors);
          setTimeout(() => {
            setErrors(null);
          }, 4000);
          clearTimeout();
        }
        setSmallLoading(false);
        console.log(err);
      });
  };

  return (
    <>
      <Navbar />

      {smallLoading ? (
        <Loading />
      ) : (
        <div className="signupLogin">
          <div className="form fadeInDown">
            <form onSubmit={onSubmit}>
              <h1 className="title">Signup as a nurse</h1>
              {errors && (
                <div className="error fadeInDown">
                  {Object.keys(errors).map((key) => (
                    <p key={key}>{errors[key][0]}</p>
                  ))}
                </div>
              )}
              <div className="labelInput">
                <label for="fullname">Full Name:</label>
                <input
                  ref={nameRef}
                  id="fullname"
                  name="name"
                  placeholder="Full Name"
                />
              </div>
              <div className="labelInput">
                <label for="emailaddress">Email Address:</label>
                <input
                  ref={emailRef}
                  id="emailaddress"
                  name="email"
                  type="email"
                  placeholder="Email Address"
                />
              </div>
              <div className="labelInput">
                <label for="cv">Your CV (jpeg,png,jpg):</label>
                <input
                  className="file"
                  id="cv"
                  type="file"
                  name="cv"
                  onChange={(e) => {
                    cv = e.target.files[0];
                  }}
                />
              </div>
              <div className="labelInput">
                <label for="password">Password:</label>
                <input
                  ref={passwordRef}
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                />
              </div>
              <div className="labelInput">
                <label for="passwordconfirmation">Password Confirmation:</label>
                <input
                  ref={passwordConfirmationRef}
                  id="passwordconfirmation"
                  name="password_confirmation"
                  type="password"
                  placeholder="Password Confirmation"
                />
              </div>
              <button className="btn">Signup</button>
              <p className="message">
                Already Registered? <Link to="/login">Sign in.</Link>
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
