import React, { useEffect, useRef, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useStateContext } from "../ContextProvider";
import noProfilePic from "../images/noProfilePicImage.jpg";
import axiosClient from "../axios-client";
import { SmallLoading } from "../components/SmallLoading";
import { Link } from "react-router-dom";

export const Profile = () => {
  const [user, setUser] = useState({});
  let profilePicture = "";
  let backgroundPicture = "";
  const nameRef = useRef();
  const descriptionRef = useRef();
  const [smallLoading, setSmallLoading] = useState(false);

  const editProfile = (input) => {
    const headers = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    const formData = new FormData();

    if (profilePicture || backgroundPicture) {
      setSmallLoading(true);
      axiosClient
        .post(`/profile/${user.id}`, input, headers)
        .then(({ data }) => {
          setSmallLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });

      axiosClient.get("/user").then(({ data }) => {
        setUser(data);
      });
    }
  };

  const editNameDescription = () => {
    const payload = {
      name: nameRef.current.value,
      description: descriptionRef.current.value,
    };
    setSmallLoading(true);
    axiosClient
      .put(`/profile/${user.id}`, payload)
      .then()
      .catch((err) => {
        console.log(err);
      });
    axiosClient.get("/user").then(({ data }) => {
      setSmallLoading(false);
      setUser(data);
    });
  };

  useEffect(() => {
    setSmallLoading(true);
    axiosClient.get("/user").then(({ data }) => {
      setSmallLoading(false);
      setUser(data);
    });
  }, []);

  return (
    <>
      <Navbar />

      {smallLoading ? (
        <SmallLoading />
      ) : (
        <>
          <div
            className="space"
            style={
              user.background_picture
                ? {
                    backgroundImage: `url(http://127.0.0.1:8000/storage/${user.background_picture})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }
                : {
                    background: "lightgray",
                  }
            }
          >
            {user.profile_picture ? (
              <img
                src={`http://127.0.0.1:8000/storage/${user.profile_picture}`}
                className="profilePic"
              />
            ) : (
              <i class="fa-solid fa-user fa-2xl profilePic"></i>
            )}
          </div>

          <div className="createeditpost">
            <h2>Edit Profile</h2>

            <div>
              <label htmlFor="profile">Edit your profile picture:</label>
              <input
                type="file"
                name="profile_picture"
                id="profile"
                onChange={(e) => {
                  profilePicture = e.target.files[0];
                  const formData = new FormData();
                  formData.append("_method", "PUT");
                  formData.append("profile_picture", profilePicture);
                  editProfile(formData);
                }}
              />
            </div>
            <div>
              <label htmlFor="banner">Edit your banner:</label>
              <input
                type="file"
                name="background_picture"
                id="banner"
                onChange={(e) => {
                  // profilePicture.profile_picture = e.target.files[0];
                  backgroundPicture = e.target.files[0];
                  const formData = new FormData();
                  formData.append("_method", "PUT");
                  formData.append("background_picture", backgroundPicture);
                  editProfile(formData);
                }}
              />
            </div>

            <div>
              <label htmlFor="name">Edit your name:</label>
              <input
                ref={nameRef}
                id="name"
                type="text"
                defaultValue={user.name}
              />
            </div>
            <div>
              <label htmlFor="description">Edit description:</label>
              <textarea
                ref={descriptionRef}
                defaultValue={user.description}
                cols="30"
                rows="10"
                id="description"
                placeholder="Description"
              ></textarea>
            </div>
            <button className="btn" onClick={() => editNameDescription()}>
              Save changes
            </button>
          </div>
        </>
      )}

      <Footer />
    </>
  );
};
