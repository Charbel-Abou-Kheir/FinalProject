import React, { useRef, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../ContextProvider";
import { Loading } from "../components/Loading";

export const SignupUser = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const role = "user";
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();
  const [smallLoading, setSmallLoading] = useState(false);

  const { user, setUser, setToken } = useStateContext();

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
      role: role,
    };

    setSmallLoading(true);
    axiosClient
      .post("/signupuser", payload)
      .then(() => {
        setSmallLoading(false);
        navigate("/login");
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
        setTimeout(() => {
          setErrors(null);
        }, 4000);
        clearTimeout();
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
            {errors && (
              <div className="error fadeInDown">
                {Object.keys(errors).map((key) => (
                  <p key={key}>{errors[key][0]}</p>
                ))}
              </div>
            )}
            <form onSubmit={onSubmit}>
              <h1 className="title">Signup as a user</h1>
              <div className="labelInput">
                <label for="fullname">Full Name:</label>
                <input ref={nameRef} id="fullname" placeholder="Full Name" />
              </div>
              <div className="labelInput">
                <label for="emailaddress">Email Address:</label>
                <input
                  ref={emailRef}
                  id="emailaddress"
                  type="email"
                  placeholder="Email Address"
                />
              </div>
              <div className="labelInput">
                <label for="password">Password:</label>
                <input
                  ref={passwordRef}
                  id="password"
                  type="password"
                  placeholder="Password"
                />
              </div>
              <div className="labelInput">
                <label for="passwordconfirmation">Password Confirmation:</label>
                <input
                  ref={passwordConfirmationRef}
                  id="passwordconfirmation"
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
