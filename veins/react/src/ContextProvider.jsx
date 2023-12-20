import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  user: null,
  token: null,
  notification: null,
  setUser: () => {},
  setToken: () => {},
  setNotification: () => {},
});

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
  const [notification, _setNotification] = useState("");

  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
      // I am saving this in the localstorage because whenever the user authenticates we take the token and we set it in the localstorage so whenever we refresh the page the user needs to stay as an authenticated person
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  const setNotification = (message) => {
    _setNotification(message);
    setTimeout(() => {
      _setNotification("");
    }, 5000);
  };

  return (
    <StateContext.Provider
      value={{
        user,
        token,
        setUser,
        setToken,
        notification,
        setNotification,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
