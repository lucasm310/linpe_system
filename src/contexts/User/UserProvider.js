import React, { useState, useEffect } from "react";
import UserContext from "./UserContext";
import { useHistory } from "react-router-dom";
import ReactGA from "react-ga";
import { Auth } from "aws-amplify";

const UserProvider = ({ children }) => {
  const [logged, setLogged] = useState(false);
  const [token, setToken] = useState(false);
  const [user, setUser] = useState(false);
  const [expire, setExpire] = useState(false);
  const [groups, setGroups] = useState(false);
  const [openPerfil, setOpenPerfil] = useState(false);
  const history = useHistory();

  const isLoged = (res) => {
    var accestoken = res.getAccessToken();
    // console.log(accestoken)
    setGroups(accestoken.payload["cognito:groups"]);
    setToken(accestoken.jwtToken);
    setExpire(accestoken.payload["exp"]);
    setLogged(true);
    Auth.currentUserInfo()
      .then((res) => {
        setUser(res);
        if (
          !("custom:curso" in res.attributes) ||
          !("birthdate" in res.attributes) ||
          !("custom:nivel" in res.attributes) ||
          !("phone_number" in res.attributes)
        ) {
          setOpenPerfil(true);
          // console.log(res);
        }
      })
      .catch((err) => console.log(err));
  };

  const isNotLoged = (err) => {
    console.log(err);
    setLogged(false);
  };

  const checkExpire = () => {
    if (expire < Math.floor(Date.now() / 1000)) {
      setLogged(false);
    }
  };

  useEffect(() => {
    Auth.currentSession()
      .then((res) => isLoged(res))
      .catch((err) => isNotLoged(err));
  }, [logged]);

  useEffect(() => {
    return history.listen((location) => {
      ReactGA.set({ page: location.pathname });
      ReactGA.pageview(location.pathname);
    });
  }, [history]);

  return (
    <UserContext.Provider
      value={{
        logged,
        isLoged,
        setLogged,
        token,
        user,
        groups,
        checkExpire,
        openPerfil,
        setOpenPerfil,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
