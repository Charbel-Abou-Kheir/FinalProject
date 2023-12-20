import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Navbar } from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";
import { useStateContext } from "../ContextProvider";
import { SmallLoading } from "../components/SmallLoading";
import { SmallHeader } from "../components/SmallHeader";

export const Posts = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useStateContext();
  const [smallLoading, setSmallLoading] = useState(false);
  const navigate = useNavigate();
  const { notification, setNotification } = useStateContext();

  const donate = () => {
    const payload = {
      name: user.name,
      user_id: user.id,
      email: user.email,
      times_donated: user.times_donated,
      profile_picture: user.profile_picture,
    };

    setSmallLoading(true);
    axiosClient
      .post("/expecteddonors", payload)
      .then(() => {
        setSmallLoading(false);
        setNotification("You were added to a list of expected donors");
      })
      .catch((err) => {
        setSmallLoading(false);
        setNotification(
          "You are already in a list of expected donors wait for approval or send Email to cancel request"
        );
        console.log(err);
      });
  };

  useEffect(() => {
    setSmallLoading(true);
    axiosClient
      .get("/posts")
      .then(({ data }) => {
        setSmallLoading(false);
        setPosts(data.posts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Navbar />

      <SmallHeader title={"Posts"} />

      <div className="request">
        <div className="ct">
          <h2>Request Blood</h2>
          <button
            style={{ cursor: "pointer" }}
            className="button"
            onClick={() => {
              console.log(user);
              if (user.name) {
                navigate("/posts/create");
              } else {
                navigate("/login");
              }
            }}
          >
            <i class="fa-solid fa-plus fa-fade"></i>
          </button>
        </div>
      </div>

      <div className="posts container">
        <h1>Recent blood requests</h1>
        {notification && (
          <div className="notification fadeInDown">{notification}</div>
        )}
        {smallLoading ? (
          <SmallLoading />
        ) : (
          posts &&
          posts.map((post, index) => (
            <Link key={index} className="post">
              <div className="content">
                <div className="info">
                  {post.profile_picture ? (
                    <Link to={`/userprofile/${post.user_id}`}>
                      <img
                        src={`http://127.0.0.1:8000/storage/${post.profile_picture}`}
                        className="expectedProfile"
                      />
                    </Link>
                  ) : (
                    <Link to={`/userprofile/${post.user_id}`}>
                      <i class="fa-solid fa-user fa-2xl expectedNoProfile"></i>
                    </Link>
                  )}
                  <div className="username">{post.username}</div>
                  <p className="status">{post.status}</p>
                  <div className="type">{post.blood_type}</div>
                </div>
                Contact info: {post.contact_info}
                <p className="description">{post.description}</p>
                {user.name && (
                  <Link onClick={() => donate()} className="donate">
                    Ok, I'll donate.
                  </Link>
                )}
              </div>
            </Link>
          ))
        )}
      </div>

      <Footer />
    </>
  );
};
