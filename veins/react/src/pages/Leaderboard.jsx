import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
import leaderboard from "../images/leaderboard.avif";
import { SmallLoading } from "../components/SmallLoading";
import { SmallHeader } from "../components/SmallHeader";

export const Leaderboard = () => {
  const [users, setUsers] = useState();
  const [smallLoading, setSmallLoading] = useState(false);

  useEffect(() => {
    setSmallLoading(true);
    axiosClient
      .get("/leaderboard")
      .then(({ data }) => {
        setSmallLoading(false);
        setUsers(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Navbar />

      <SmallHeader title={"Leaderboard"} />

      <div className="container">
        <img src={leaderboard} className="leaderboard" />
      </div>

      <div className="users container">
        {smallLoading ? (
          <SmallLoading />
        ) : (
          users &&
          users.map((user, index) => {
            if (index === 0) {
              return (
                <Link
                  key={user.id}
                  style={{ background: "yellow" }}
                  className="user"
                >
                  {user.profile_picture ? (
                    <Link
                      style={{ cursor: "pointer" }}
                      to={`/userprofile/${user.id}`}
                    >
                      <img
                        src={`http://127.0.0.1:8000/storage/${user.profile_picture}`}
                        className="expectedProfile"
                      />
                    </Link>
                  ) : (
                    <Link
                      style={{ cursor: "pointer" }}
                      to={`/userprofile/${user.id}`}
                    >
                      <i class="fa-solid fa-user fa-2xl expectedNoProfile"></i>
                    </Link>
                  )}
                  <div>{user.name}</div>
                  <div className="times-donated">lvl.{user.times_donated}</div>
                </Link>
              );
            }
            if (index === 1) {
              return (
                <Link
                  key={user.id}
                  style={{ background: "silver" }}
                  className="user"
                >
                  {user.profile_picture ? (
                    <Link
                      style={{ cursor: "pointer" }}
                      to={`/userprofile/${user.id}`}
                    >
                      <img
                        src={`http://127.0.0.1:8000/storage/${user.profile_picture}`}
                        className="expectedProfile"
                      />
                    </Link>
                  ) : (
                    <Link
                      style={{ cursor: "pointer" }}
                      to={`/userprofile/${user.id}`}
                    >
                      <i class="fa-solid fa-user fa-2xl expectedNoProfile"></i>
                    </Link>
                  )}
                  <div>{user.name}</div>
                  <div className="times-donated">lvl.{user.times_donated}</div>
                </Link>
              );
            }
            if (index === 2) {
              return (
                <Link
                  key={user.id}
                  style={{ background: "rgb(214 72 72)" }}
                  className="user"
                >
                  {user.profile_picture ? (
                    <Link
                      style={{ cursor: "pointer" }}
                      to={`/userprofile/${user.id}`}
                    >
                      <img
                        src={`http://127.0.0.1:8000/storage/${user.profile_picture}`}
                        className="expectedProfile"
                      />
                    </Link>
                  ) : (
                    <Link
                      style={{ cursor: "pointer" }}
                      to={`/userprofile/${user.id}`}
                    >
                      <i class="fa-solid fa-user fa-2xl expectedNoProfile"></i>
                    </Link>
                  )}
                  <div>{user.name}</div>
                  <div className="times-donated">lvl.{user.times_donated}</div>
                </Link>
              );
            } else {
              return (
                <Link key={user.id} className="user">
                  {user.profile_picture ? (
                    <Link
                      style={{ cursor: "pointer" }}
                      to={`/userprofile/${user.id}`}
                    >
                      <img
                        src={`http://127.0.0.1:8000/storage/${user.profile_picture}`}
                        className="expectedProfile"
                      />
                    </Link>
                  ) : (
                    <Link
                      style={{ cursor: "pointer" }}
                      to={`/userprofile/${user.id}`}
                    >
                      <i class="fa-solid fa-user fa-2xl expectedNoProfile"></i>
                    </Link>
                  )}
                  <div>{user.name}</div>
                  <div className="times-donated">lvl.{user.times_donated}</div>
                </Link>
              );
            }
          })
        )}
      </div>

      <Footer />
    </>
  );
};

{
  /* <div className="users container">
  {users &&
    users.map((user, index) => (
      <Link key={user.id} className="user">
        {user.profile_picture ? (
          <img
            src={`http://127.0.0.1:8000/storage/${user.profile_picture}`}
            className="expectedProfile"
          />
        ) : (
          <i class="fa-solid fa-user fa-2xl expectedNoProfile"></i>
        )}
        <div>{user.name}</div>
        <div className="times-donated">lvl.{user.times_donated}</div>
      </Link>
    ))}
</div>; */
}
