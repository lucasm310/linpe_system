import React, { useState } from "react";
import {
  Typography,
  Link,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import { loginStyle } from "./index.style";
import { Auth } from "aws-amplify";

export default function FormSignUp(props) {
  const { setTipoForm, setUserName } = props;
  const [senha, setSenha] = useState();
  const [email, setEmail] = useState();
  const [nome, setNome] = useState();
  const [telefone, setTelefone] = useState();
  const [dataNascimento, setDataNascimento] = useState();
  const [curso, setCurso] = useState();
  const [nivel, SetNivel] = useState();

  const [erroField, setErroField] = useState(false);
  const classes = loginStyle();
  async function signUp() {
    try {
      await Auth.signUp({
        username: email,
        password: senha,
        attributes: {
          email: email,
          name: nome,
          "custom:telefone": telefone,
          "custom:datanascimento": dataNascimento,
          "custom:curso": curso,
          "custom:nivel": nivel,
        },
      }).then((res) => {
        console.log(res);
        setUserName(res.userSub);
        console.log("sign up success!");
        setTipoForm("confsignup");
      });
    } catch (err) {
      console.log("error signing up..", err);
    }
  }

  return (
    <>
      <Typography component="h1" variant="h5">
        Cadastrar
      </Typography>
      <form className={classes.form}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="nome"
          label="Nome"
          name="nome"
          autoComplete="nome"
          onChange={(event) => setNome(event.target.value)}
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
          onChange={(event) => setDataNascimento(event.target.value)}
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
          onChange={(event) => setTelefone(event.target.value)}
          error={erroField}
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
          onChange={(event) => setCurso(event.target.value)}
          error={erroField}
        />
        <InputLabel id="nivel-especializacao">Nível Especialização</InputLabel>
        <Select
          variant="outlined"
          margin="normal"
          labelId="nivel-especializacao"
          id="nivel-especializacao"
          onChange={(event) => {
            SetNivel(event.target.value);
          }}
          required
          fullWidth
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
          onChange={(event) => setEmail(event.target.value)}
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
          onChange={(event) => setSenha(event.target.value)}
          error={erroField}
        />
        <Button
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => signUp()}
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
  );
}
