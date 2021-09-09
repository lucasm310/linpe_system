import React, { useState } from "react"
import { Typography, TextField, Button } from "@material-ui/core"
import { loginStyle } from "./index.style"
import { Auth } from "aws-amplify"

export default function FormSignUpConfirm(props) {
  const { setTipoForm, username, email } = props
  const [erroField, setErroField] = useState(false)
  const [codigo, setCodigo] = useState()
  const classes = loginStyle()

  async function confirmSignUp(event) {
    event.preventDefault()
    try {
      await Auth.confirmSignUp(username, codigo)
      console.log("confirm sign up success!")
      setTipoForm("signin")
    } catch (err) {
      setErroField(true)
      console.log("error signing up..", err)
    }
  }
  return (
    <>
      <Typography component="h1" variant="h5">
        Confirmar Cadastro
      </Typography>
      <form className={classes.form} onSubmit={event => confirmSignUp(event)}>
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
          onChange={event => setCodigo(event.target.value)}
          error={erroField}
          helperText={
            erroField
              ? "Código invalido"
              : `Enviamos um email para: ${email} com o código de verificação.`
          }
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Confirmar
        </Button>
      </form>
    </>
  )
}
