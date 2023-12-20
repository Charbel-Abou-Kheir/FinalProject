import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import axiosClient from "../axios-client";
import { useParams } from "react-router-dom";
import { SmallLoading } from "../components/SmallLoading";

export const UserProfile = () => {
  const [user, setUser] = useState({});
  const [smallLoading, setSmallLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setSmallLoading(true);
    axiosClient
      .get(`/userprofile/${id}`)
      .then(({ data }) => {
        setSmallLoading(false);
        setUser(data);
      })
      .catch((err) => {
        console.log(err);
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
            <h3 style={{ color: "rgba(0,0,0,0.5)" }}>Name: {user.name}</h3>
            <br />
            {user.description && (
              <h3 style={{ color: "rgba(0,0,0,0.5)" }}>
                About: {user.description}
              </h3>
            )}

            {user.description && <div>About: {user.description}</div>}
          </div>
        </>
      )}

      <Footer />
    </>
  );
};
