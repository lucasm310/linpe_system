import React, { useState, useContext } from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  TextField,
  Select,
  MenuItem,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useStyles } from "../index.style";
import UserContext from "../../contexts/User/UserContext";
import AlertsContext from "../../contexts/Alerts/AlertsContext";
import { novoDocumento } from "./services";


function NewDocumento(props) {
  const { onClose, open } = props;
  const [nome, setNome] = useState("");
  const [grupo, setGrupo] = useState("geral");
  const [tipo, setTipo] = useState("privado");
  const [nomefile, setNomefile] = useState("");
  const [file, setFile] = useState();
  const { token } = useContext(UserContext);
  const { setOpenAlert, setMessage } = useContext(AlertsContext);
  const history = useHistory();

  const classes = useStyles();

  const handleClose = () => {
    onClose();
  };

  const handleFile = ({ target }) => {
    const name = target.files[0].name;
    setNomefile(name);
    const formData = new FormData();
    formData.append("file", target.files[0]);
    setFile(formData);
  };

  const handlerSalvar = () => {
    let dados = {
      nome: nome,
      nome_file: nomefile,
      grupo: grupo,
      tipo: tipo
    };
    novoDocumento(dados, file, history, token, setOpenAlert, setMessage);
    onClose(true);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      open={open}
    >
      <DialogTitle id="form-dialog-title">Cadastrar Conteudo</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Nome"
          onChange={(data) => {
            setNome(data.target.value);
          }}
          className={classes.addDoc}
          fullWidth={true}
        />
        <Select
          labelId="tipo-select"
          id="tipo-select"
          value={tipo}
          onChange={(data) => {
            setTipo(data.target.value);
          }}
          className={classes.addDoc}
          fullWidth={true}
        >
          <MenuItem value="publico">Publíco</MenuItem>
          <MenuItem value="privado">Privado</MenuItem>
        </Select>
        {tipo === "privado" && (
          <Select
            labelId="grupo-select"
            id="grupo-select"
            value={grupo}
            onChange={(data) => {
              setGrupo(data.target.value);
            }}
            className={classes.addDoc}
            fullWidth={true}
          >
            <MenuItem value="geral">Geral</MenuItem>
            <MenuItem value="ligantes">Ligantes</MenuItem>
            <MenuItem value="diretoria">Diretoria</MenuItem>
          </Select>
        )}
        <input
          accept="*/*"
          className={classes.inputUpload}
          id="contained-button-file"
          multiple
          type="file"
          onChange={(data) => {
            handleFile(data);
          }}
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span" className={classes.addDoc}>
            Upload
          </Button>
        </label>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={() => {
            handlerSalvar();
          }}
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default NewDocumento;
