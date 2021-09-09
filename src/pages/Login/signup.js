import React, { useState } from "react"
import {
  Typography,
  Link,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core"
import { loginStyle } from "./index.style"
import { Auth } from "aws-amplify"

export default function FormSignUp(props) {
  const { setTipoForm, setUserName, setUserEmail } = props
  const [senha, setSenha] = useState()
  const [email, setEmail] = useState()
  const [nome, setNome] = useState()
  const [telefone, setTelefone] = useState()
  const [dataNascimento, setDataNascimento] = useState()
  const [curso, setCurso] = useState()
  const [nivel, SetNivel] = useState("bacharelado")

  const [erroField, setErroField] = useState(false)
  const [erroFieldEmail, setErroFieldEmail] = useState(false)
  const classes = loginStyle()
  async function signUp(event) {
    event.preventDefault()
    let telefoneFormatado = telefone
    if (telefone.startsWith("+55") === false) {
      telefoneFormatado = `+55${telefone}`
    }
    try {
      await Auth.signUp({
        username: email,
        password: senha,
        attributes: {
          email: email,
          name: nome,
          phone_number: telefoneFormatado,
          birthdate: dataNascimento,
          "custom:curso": curso,
          "custom:nivel": nivel,
        },
      }).then(res => {
        // console.log(res);
        setUserName(res.userSub)
        setUserEmail(email)
        console.log("sign up success!")
        setTipoForm("confsignup")
      })
    } catch (err) {
      if (err.code === "UsernameExistsException") {
        setErroFieldEmail(true)
      } else {
        setErroField(true)
      }
      console.log("error signing up..", err)
    }
  }

  return (
    <>
      <Typography component="h1" variant="h5">
        Cadastrar
      </Typography>
      <form
        className={classes.form}
        noValidate={false}
        onSubmit={event => signUp(event)}
      >
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="nome"
          label="Nome"
          name="nome"
          autoComplete="nome"
          onChange={event => setNome(event.target.value)}
          error={erroField}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="date"
          id="data_nascimento"
          label="Data Nascimento"
          name="data_nascimento"
          onChange={event => setDataNascimento(event.target.value)}
          error={erroField}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="telefone"
          label="Telefone"
          name="telefone"
          autoComplete="telefone"
          onChange={event => setTelefone(event.target.value)}
          error={erroField}
          helperText="DDD+Número, ex: 1499998888"
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="curso"
          label="Curso"
          name="curso"
          autoComplete="curso"
          onChange={event => setCurso(event.target.value)}
          error={erroField}
        />
        <InputLabel id="nivel-especializacao">Nível Especialização</InputLabel>
        <Select
          variant="outlined"
          labelId="nivel-especializacao"
          id="nivel-especializacao"
          onChange={event => {
            SetNivel(event.target.value)
          }}
          required
          fullWidth
          value={nivel}
        >
          <MenuItem value="bacharelado">Bacharelado</MenuItem>
          <MenuItem value="licenciatura">Licenciatura</MenuItem>
          <MenuItem value="tecnólogo">Tecnólogo</MenuItem>
          <MenuItem value="especialização">Especialização</MenuItem>
          <MenuItem value="mba">MBA</MenuItem>
          <MenuItem value="mestrado">Mestrado</MenuItem>
          <MenuItem value="doutorado">Doutorado</MenuItem>
          <MenuItem value="pos-doutorado">Pós-doutorado</MenuItem>
        </Select>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          type="email"
          onChange={event => setEmail(event.target.value)}
          error={erroFieldEmail}
          helperText={erroFieldEmail && "Email já cadastrado"}
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
          helperText={
            erroField
              ? "Campos inválidos por favor verificar"
              : "Minimo 8 dígitos"
          }
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Cadastrar
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Esqueceu a senha?
            </Link>
          </Grid>
          <Grid item>
            <Link
              href="#"
              variant="body2"
              onClick={() => setTipoForm("signin")}
            >
              {"Já tem uma conta? Entre uma aqui"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </>
  )
}
