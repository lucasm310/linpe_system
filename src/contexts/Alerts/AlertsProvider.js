import React, { useState } from "react";
import AlertsContext from "./AlertsContext";

const AlertsProvider = ({ children }) => {
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState(false);
  
  const handleClose = () => {
    setOpenAlert(false)
  }

  return (
    <AlertsContext.Provider
      value={{
        openAlert,
        setOpenAlert,
        handleClose,
        message,
        setMessage
      }}
    >
      {children}
    </AlertsContext.Provider>
  );
};

export default AlertsProvider;
