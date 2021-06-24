import React, { useState } from "react";
import {
  Avatar,
  CssBaseline,
  Box,
  Container,
} from "@material-ui/core";
import { loginStyle } from "./index.style";
import Copyright from "./copyright";
import FormSignIn from "./singin";
import FormSignUp from "./signup";
import FormSignUpConfirm from "./singupconf";

import logo from "../../assets/logo.png";

export default function SignIn() {
  const classes = loginStyle();
  const [tipoForm, setTipoForm] = useState("signin");
  const [username, setUserName] = useState();
  const [email, setEmail] = useState();

  let form = "";

  if (tipoForm === "signin") {
    form = <FormSignIn setTipoForm={setTipoForm} />;
  } else if (tipoForm === "signup") {
    form = <FormSignUp setTipoForm={setTipoForm} setUserName={setUserName} setUserEmail={setEmail} />;
  } else if (tipoForm === "confsignup") {
    form = <FormSignUpConfirm setTipoForm={setTipoForm} username={username} email={email} />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar} src={logo} />
        {form}
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
