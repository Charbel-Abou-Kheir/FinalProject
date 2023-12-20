import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
import { useStateContext } from "../ContextProvider";
import { SmallLoading } from "../components/SmallLoading";
import { SmallHeader } from "../components/SmallHeader";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useStateContext();
  const [smallLoading, setSmallLoading] = useState(false);
  const { notification, setNotification } = useStateContext();

  const levelUp = (id, times_donated) => {
    const payload = {
      times_donated: times_donated + 1,
    };

    setSmallLoading(true);
    axiosClient
      .put(`/levelup/${id}`, payload)
      .then()
      .catch((err) => {
        console.log(err);
      });

    axiosClient
      .get("/search")
      .then(({ data }) => {
        setSmallLoading(false);
        setNotification("User leveled up successfully");
        setUsers(data);
      })
      .catch((err) => {
        setSmallLoading(false);
        console.log(err);
      });
  };

  const onDelete = (id) => {
    setSmallLoading(true);
    axiosClient
      .delete(`/users/${id}`)
      .then()
      .catch((err) => {
        console.log(err);
      });

    axiosClient
      .get("/search")
      .then(({ data }) => {
        setNotification("User deleted successfully");
        setSmallLoading(false);
        setUsers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setSmallLoading(true);
    axiosClient
      .get(`/search/${searchTerm}`)
      .then(({ data }) => {
        setSmallLoading(false);
        setUsers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchTerm]);

  return (
    <>
      <Navbar />

      <SmallHeader title={"Users"} />

      <div className="users container">
        {notification && (
          <div className="notification fadeInDown">{notification}</div>
        )}
        <form>
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            name="search"
            placeholder="Search users by name"
          />
        </form>
        {smallLoading ? (
          <SmallLoading />
        ) : (
          users &&
          users.map((usr) => (
            <Link key={usr.id} className="user">
              {usr.profile_picture ? (
                <Link
                  style={{ cursor: "pointer" }}
                  to={`/userprofile/${usr.id}`}
                >
                  <img
                    src={`http://127.0.0.1:8000/storage/${usr.profile_picture}`}
                    className="expectedProfile"
                  />
                </Link>
              ) : (
                <Link
                  style={{ cursor: "pointer" }}
                  to={`/userprofile/${usr.id}`}
                >
                  <i class="fa-solid fa-user fa-2xl expectedNoProfile"></i>
                </Link>
              )}
              <div>{usr.name}</div>
              <div>{usr.email}</div>
              <div className="times-donated">lvl.{usr.times_donated}</div>
              <Link
                className="levelup"
                onClick={() => levelUp(usr.id, usr.times_donated)}
              >
                Level UP
              </Link>
              {user.role === "admin" && (
                <Link onClick={() => onDelete(usr.id)} className="decline">
                  Delete
                </Link>
              )}
            </Link>
          ))
        )}
      </div>

      <Footer />
    </>
  );
};
