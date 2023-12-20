import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { useStateContext } from "../ContextProvider";
import axiosClient from "../axios-client";
import { Loading } from "../components/Loading";

export const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errors, setErrors] = useState(null);
  const { setUser, setToken } = useStateContext();
  const navigate = useNavigate();
  const [smallLoading, setSmallLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    setErrors(null);

    setSmallLoading(true);
    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
        setSmallLoading(false);
        navigate("/");
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          if (response.data.errors) {
            setErrors(response.data.errors);
          } else {
            setErrors({
              email: [response.data.message],
            });
          }
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
              <h1 className="title">Login into your account</h1>
              {errors && (
                <div className="error fadeInDown">
                  {Object.keys(errors).map((key) => (
                    <p key={key}>{errors[key][0]}</p>
                  ))}
                </div>
              )}
              <div className="labelInput">
                <label for="email">Email:</label>
                <input
                  ref={emailRef}
                  id="email"
                  type="email"
                  placeholder="Email"
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
              <button className="btn">Login</button>
              <p className="message">
                Not Registered? <Link to="/signup">Create an account.</Link>
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
