import React, { useState } from "react";
import { useStateContext } from "../ContextProvider";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useRef } from "react";
import axiosClient from "../axios-client";
import { useNavigate } from "react-router-dom";
import { SmallLoading } from "../components/SmallLoading";

export const CreatePost = () => {
  const contactInfoRef = useRef();
  const bloodTypeRef = useRef();
  const requestStatusRef = useRef();
  const descriptionRef = useRef();
  const { user } = useStateContext();
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();
  const [smallLoading, setSmallLoading] = useState(false);
  const { notification, setNotification } = useStateContext();

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      username: user.name,
      contact_info: contactInfoRef.current.value,
      blood_type: bloodTypeRef.current.value,
      status: requestStatusRef.current.value,
      description: descriptionRef.current.value,
    };

    setSmallLoading(true);
    axiosClient
      .post("/posts", payload)
      .then(() => {
        setSmallLoading(false);
        setNotification("Post created successfully");
        navigate("/posts");
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

      {smallLoading ? (
        <SmallLoading />
      ) : (
        <form onSubmit={onSubmit} className="createeditpost">
          {errors && (
            <div className="error fadeInDown">
              {Object.keys(errors).map((key) => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          )}
          <div className="contactinfo">
            <label htmlFor="contact">Contact Info: </label>
            <input ref={contactInfoRef} id="contact" type="tel" />
          </div>
          <select ref={bloodTypeRef} id="type">
            <option value="">Select Blood Type</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="OH+">OH+</option>
          </select>
          <select ref={requestStatusRef} id="status">
            <option value="">Select Request Status</option>
            <option value="Request Pending">Request Pending</option>
            <option value="Urgent">Urgent</option>
            <option value="Extremly Urgent">Extremly Urgent</option>
          </select>
          <div>
            <label htmlFor="description">Description: </label>
            <textarea
              id="description"
              ref={descriptionRef}
              cols="30"
              rows="10"
              placeholder="Location and situation"
            ></textarea>
          </div>

          <button className="btn">Request Blood</button>
        </form>
      )}

      <Footer />
    </>
  );
};
