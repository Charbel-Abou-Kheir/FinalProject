import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
import { SmallLoading } from "../components/SmallLoading";
import { useStateContext } from "../ContextProvider";
import { SmallHeader } from "../components/SmallHeader";

export const ExpectedDonors = () => {
  const [users, setUsers] = useState([]);
  const [smallLoading, setSmallLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { notification, setNotification } = useStateContext();

  const levelUp = (user_id, times_donated, id) => {
    const payload = {
      times_donated: times_donated + 1,
    };

    setSmallLoading(true);
    axiosClient
      .put(`/levelup/${user_id}`, payload)
      .then()
      .catch((err) => {
        console.log(err);
      });

    axiosClient
      .delete(`/expecteddonors/${id}`)
      .then()
      .catch((err) => {
        console.log(err);
      });

    axiosClient
      .get("/expecteddonors")
      .then(({ data }) => {
        setSmallLoading(false);
        setNotification("User leveled up successfully");
        setUsers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onDelete = (id) => {
    setSmallLoading(true);
    axiosClient
      .delete(`/expecteddonors/${id}`)
      .then()
      .catch((err) => {
        console.log(err);
      });

    axiosClient
      .get("/expecteddonors")
      .then(({ data }) => {
        setSmallLoading(false);
        setNotification("User declined");
        setUsers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setSmallLoading(true);
    axiosClient
      .get(`/expecteddonors/${searchTerm}`)
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

      <SmallHeader title={"Expected donors"} />

      <div className="users container">
        {notification && (
          <div className="notification fadeInDown">{notification}</div>
        )}
        <h2 style={{ color: "rgba(0, 0, 0, 0.5)" }}>Expected donors</h2>
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
          users.map((user) => (
            <Link key={user.id} className="user">
              {user.profile_picture ? (
                <Link
                  style={{ cursor: "pointer" }}
                  to={`/userprofile/${user.user_id}`}
                >
                  <img
                    src={`http://127.0.0.1:8000/storage/${user.profile_picture}`}
                    className="expectedProfile"
                  />
                </Link>
              ) : (
                <Link
                  style={{ cursor: "pointer" }}
                  to={`/userprofile/${user.user_id}`}
                >
                  <i class="fa-solid fa-user fa-2xl expectedNoProfile"></i>
                </Link>
              )}
              <div>{user.name}</div>
              <div>{user.email}</div>
              <div className="times-donated">lvl.{user.times_donated}</div>
              <Link
                className="levelup"
                onClick={() =>
                  levelUp(user.user_id, user.times_donated, user.id)
                }
              >
                Level UP
              </Link>
              <Link className="decline" onClick={() => onDelete(user.id)}>
                Decline
              </Link>
            </Link>
          ))
        )}
      </div>

      <Footer />
    </>
  );
};
