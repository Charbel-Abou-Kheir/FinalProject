import React, { useRef, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import axiosClient from "../axios-client";
import { useStateContext } from "../ContextProvider";
import { SmallLoading } from "../components/SmallLoading";
import { SmallHeader } from "../components/SmallHeader";

export const ContactUs = () => {
  const [errors, setErrors] = useState(null);
  const nameRef = useRef();
  const emailRef = useRef();
  const subjectRef = useRef();
  const contentRef = useRef();
  const { notification, setNotification } = useStateContext();
  const [smallLoading, setSmallLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      subject: subjectRef.current.value,
      content: contentRef.current.value,
    };

    setSmallLoading(true);
    axiosClient
      .post("/sendemail", payload)
      .then(() => {
        setSmallLoading(false);
        setNotification("Email sent successfully");
      })
      .catch((err) => {
        setSmallLoading(false);
        setErrors(err.response.data.errors);
        setTimeout(() => {
          setErrors(null);
        }, 4000);
        clearTimeout();
        console.log(err);
      });
  };

  return (
    <>
      <Navbar />

      <SmallHeader title={"Contact US"} />

      {smallLoading ? (
        <SmallLoading />
      ) : (
        <form onSubmit={onSubmit} className="createeditpost">
          {notification && (
            <div className="notification fadeInDown">{notification}</div>
          )}
          {errors && (
            <div className="error fadeInDown">
              {Object.keys(errors).map((key) => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          )}
          <div className="contactinfo">
            <label htmlFor="name">Name: </label>
            <input ref={nameRef} id="name" type="text" />
          </div>
          <div className="contactinfo">
            <label htmlFor="contact">Email: </label>
            <input ref={emailRef} id="contact" type="email" />
          </div>
          <div className="dropdown">
            <label htmlFor="type">Select Subject: </label>
            <select ref={subjectRef} id="type">
              <option value="">Select Subject</option>
              <option value="Discusion">Discusion</option>
              <option value="Suggestion">Suggestion</option>
              <option value="Complaint">Complaint</option>
            </select>
          </div>
          <div className="textarea">
            <label htmlFor="description">Message: </label>
            <textarea
              id="description"
              ref={contentRef}
              cols="30"
              rows="10"
              placeholder="Enter Your Message"
            ></textarea>
          </div>
          <button className="btn">Send Email</button>
        </form>
      )}

      <Footer />
    </>
  );
};
