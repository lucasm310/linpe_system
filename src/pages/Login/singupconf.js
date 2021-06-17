import React, { useState } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { loginStyle } from "./index.style";
import { Auth } from "aws-amplify";

export default function FormSignUpConfirm(props) {
  const { setTipoForm, username } = props;
  const [codigo, setCodigo] = useState();
  const classes = loginStyle();

  async function confirmSignUp() {
    try {
      await Auth.confirmSignUp(username, codigo);
      console.log("confirm sign up success!");
      setTipoForm("signin");
    } catch (err) {
      console.log("error signing up..", err);
    }
  }
  console.log(username);

  return (
    <>
      <Typography component="h1" variant="h5">
        Confirmar Cadastro
      </Typography>
      <form className={classes.form}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="codigo"
          label="Codigo"
          name="codigo"
          autoComplete="codigo"
          autoFocus
          onChange={(event) => setCodigo(event.target.value)}
        />
        <Button
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => confirmSignUp()}
        >
          Confirmar
        </Button>
      </form>
    </>
  );
}
