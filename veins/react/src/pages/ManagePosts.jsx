import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
import { SmallLoading } from "../components/SmallLoading";
import { useStateContext } from "../ContextProvider";
import { SmallHeader } from "../components/SmallHeader";

const ManagePosts = () => {
  const [posts, setPosts] = useState([]);
  const [smallLoading, setSmallLoading] = useState(false);
  const { notification, setNotification } = useStateContext();

  const onDelete = (id) => {
    setSmallLoading(true);
    axiosClient
      .delete(`/posts/${id}`)
      .then()
      .catch((err) => {
        console.log(err);
      });

    axiosClient
      .get("/manageposts")
      .then(({ data }) => {
        setSmallLoading(false);
        setNotification("Post deleted successfully");
        setPosts(data);
      })
      .catch((err) => {
        setSmallLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    setSmallLoading(true);
    axiosClient
      .get("/manageposts")
      .then(({ data }) => {
        setSmallLoading(false);
        setPosts(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Navbar />

      <SmallHeader title={"Manage posts"} />

      <div className="posts container">
        {notification && (
          <div className="notification fadeInDown">{notification}</div>
        )}
        <h1>Manage your posts</h1>
        {smallLoading ? (
          <SmallLoading />
        ) : (
          posts.map((post, index) => (
            <Link key={index} className="post">
              <div className="content">
                <div className="info">
                  {post.profile_picture ? (
                    <Link>
                      <img
                        src={`http://127.0.0.1:8000/storage/${post.profile_picture}`}
                        className="expectedProfile"
                      />
                    </Link>
                  ) : (
                    <Link>
                      <i class="fa-solid fa-user fa-2xl expectedNoProfile"></i>
                    </Link>
                  )}
                  <div className="username">{post.username}</div>
                  <p className="status">{post.status}</p>
                  <div className="type">{post.blood_type}</div>
                </div>
                Contact info: {post.contact_info}
                <p className="description">{post.description}</p>
                <div>
                  <Link className="edit" to={`/manageposts/${post.id}/edit`}>
                    Edit
                  </Link>
                  <button className="delete" onClick={() => onDelete(post.id)}>
                    Delete
                  </button>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      <Footer />
    </>
  );
};

export default ManagePosts;
