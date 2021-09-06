import React, { useState, useContext } from "react"
import { Typography, Link, TextField, Button, Grid } from "@material-ui/core"
import { loginStyle } from "./index.style"
import { Auth } from "aws-amplify"
import UserContext from "../../contexts/User/UserContext"

export default function FormSignIn(props) {
  const { setTipoForm } = props
  const [senha, setSenha] = useState()
  const [email, setEmail] = useState()
  const [erroField, setErroField] = useState(false)
  const [erroMessage, setErroMessage] = useState()
  const classes = loginStyle()
  const { isLoged } = useContext(UserContext)

  async function signIn() {
    if (email === undefined || senha === undefined) {
      setErroField(true)
      setErroMessage("Seu email ou senha não foram preenchidos")
    } else {
      try {
        await Auth.signIn(email, senha)
        Auth.currentSession()
          .then(res => isLoged(res))
          .catch(err => console.log(err))
        console.log("sign in success!")
      } catch (err) {
        console.log("error signing up..", err)
        setErroField(true)
        if (err.code === "UserNotConfirmedException") {
          setErroMessage("O email não foi confirmado!")
        } else if (err.code === "UserNotFoundException") {
          setErroMessage("Email não cadastrado")
        } else {
          setErroMessage(
            "Erro ao realizar o login, por favor confira seu email e senha."
          )
        }
      }
    }
  }

  return (
    <>
      <Typography component="h1" variant="h5">
        Entrar
      </Typography>
      <form className={classes.form}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={event => setEmail(event.target.value)}
          error={erroField}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Senha"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={event => setSenha(event.target.value)}
          error={erroField}
          helperText={erroField && erroMessage}
        />
        <Button
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => signIn()}
        >
          Entrar
        </Button>
        <Button
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => Auth.federatedSignIn({ provider: "Google" })}
        >
          Google
        </Button>
        <Grid container>
          {/* <Grid item xs>
            <Link href="#" variant="body2">
              Esqueceu a senha?
            </Link>
          </Grid> */}
          <Grid item>
            <Link
              href="#"
              variant="body2"
              onClick={() => setTipoForm("signup")}
            >
              {"Não tem conta? Crie uma aqui"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </>
  )
}
