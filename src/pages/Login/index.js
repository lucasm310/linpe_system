import React, { useState, useContext } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { loginStyle } from "./index.style";
import { Auth } from "aws-amplify";
import UserContext from "../../contexts/User/UserContext";
import Copyright from "./copyright";
import FormSignIn from "./singin";
import FormSignUp from "./signup";
import FormSignUpConfirm from "./singupconf";

import logo from "../../assets/logo.png";

export default function SignIn() {
  const { isLoged } = useContext(UserContext);
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
