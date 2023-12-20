import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { SmallLoading } from "../components/SmallLoading";
import { useStateContext } from "../ContextProvider";

export const SingleSignupRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState();
  const [smallLoading, setSmallLoading] = useState(false);
  const { notification, setNotification } = useStateContext();

  const onAccept = (id) => {
    const payload = {
      name: request.name,
      email: request.email,
      password: request.password,
      role: request.role,
    };

    setSmallLoading(true);
    axiosClient
      .post("/signupnurse", payload)
      .then()
      .catch((err) => {
        console.log(err);
      });

    axiosClient
      .delete(`/signuprequests/${id}`)
      .then(() => {
        setSmallLoading(false);
        setNotification("User added successfully to the database");
        navigate("/signuprequests");
      })
      .catch((err) => {
        console.log(err);
        setSmallLoading(false);
      });
  };

  const onDelete = (id) => {
    setSmallLoading(true);
    axiosClient
      .delete(`/signuprequests/${id}`)
      .then(() => {
        setSmallLoading(false);
        setNotification("User declined");
        navigate("/signuprequests");
      })
      .catch((err) => {
        console.log(err);
        setSmallLoading(false);
      });
  };

  useEffect(() => {
    setSmallLoading(true);
    axiosClient
      .get(`/signuprequests/${id}`)
      .then(({ data }) => {
        setRequest(data);
        setSmallLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setSmallLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />

      {smallLoading ? (
        <SmallLoading />
      ) : (
        request && (
          <div className="signup-requests">
            <div className="signuprequest">
              <div>
                Name: {request.name}
                <br />
                Email: {request.email}
              </div>
              <img src={`http://127.0.0.1:8000/storage/${request.cv}`} />
              <div>
                <Link className="edit" onClick={() => onAccept(request.id)}>
                  Accept
                </Link>
                <Link className="delete" onClick={() => onDelete(request.id)}>
                  Decline
                </Link>
              </div>
            </div>
          </div>
        )
      )}

      <Footer />
    </>
  );
};
