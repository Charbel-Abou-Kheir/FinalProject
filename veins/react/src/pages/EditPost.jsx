import React, { useEffect, useState } from "react";
import { useStateContext } from "../ContextProvider";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useRef } from "react";
import axiosClient from "../axios-client";
import { useNavigate, useParams } from "react-router-dom";
import { SmallLoading } from "../components/SmallLoading";

export const EditPost = () => {
  const contactInfoRef = useRef();
  const bloodTypeRef = useRef();
  const requestStatusRef = useRef();
  const descriptionRef = useRef();
  const { user } = useStateContext();
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState();
  const { notification, setNotification } = useStateContext();
  const [smallLoading, setSmallLoading] = useState(false);

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
      .put(`/posts/${id}`, payload)
      .then(() => {
        setSmallLoading(false);
        setNotification("Post edited successfully");
        navigate("/manageposts");
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

  useEffect(() => {
    setSmallLoading(true);
    axiosClient
      .get(`/posts/${id}`)
      .then(({ data }) => {
        setSmallLoading(false);
        setPost(data.post);
        if (user.id !== data.post.user_id) {
          navigate("/manageposts");
        }
      })
      .catch((err) => {
        setSmallLoading(false);
        console.log(err);
      });
  }, []);

  return (
    <>
      <Navbar />

      {smallLoading ? (
        <SmallLoading />
      ) : (
        post && (
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
              <label htmlFor="contact">Contact Info: </label>
              <input
                ref={contactInfoRef}
                id="contact"
                type="text"
                defaultValue={post.contact_info}
              />
            </div>
            <select ref={bloodTypeRef} id="type">
              <option value={post.blood_type}>{post.blood_type}</option>
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
              <option value={post.status}>{post.status}</option>
              <option value="Request Pending">Request Pending</option>
              <option value="Urgent">Urgent</option>
              <option value="Extremly Urgent">Extremly Urgent</option>
            </select>
            <div className="textarea">
              <label htmlFor="description">Description: </label>
              <textarea
                id="description"
                ref={descriptionRef}
                defaultValue={post.description}
                cols="30"
                rows="10"
                placeholder="Location and Situation"
              ></textarea>
            </div>
            <button className="btn">Edit Post</button>
          </form>
        )
      )}

      <Footer />
    </>
  );
};
