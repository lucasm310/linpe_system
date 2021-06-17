import React, { useContext } from "react";
import Main from "./Main";
import SignIn from "./Login";
import { BrowserRouter as Router } from "react-router-dom";
import UserContext from "../contexts/User/UserContext";
import UserProvider from "../contexts/User/UserProvider";
import AlertsProvider from "../contexts/Alerts/AlertsProvider";

function CheckLoged() {
  const { logged } = useContext(UserContext);

  if (logged === false) {
    return <SignIn />;
  } else {
    return <Main />;
  }
}

function App() {
  return (
    <Router>
      <UserProvider>
        <AlertsProvider>
          <CheckLoged />
        </AlertsProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
