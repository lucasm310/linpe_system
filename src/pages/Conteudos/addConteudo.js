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
  FormControl,
  InputLabel,
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
  const [categoria, setCategoria] = useState("");
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
      tipo: tipo,
      categoria: categoria
    };
    if (categoria === "mapa_mental") {
      dados.tipo = "publico"
      dados.grupo = "geral"
    }
    novoDocumento(dados, file, onClose, token, setOpenAlert, setMessage);
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
        <FormControl fullWidth={true}>
          <InputLabel id="categoria-select-label">Categoria</InputLabel>
          <Select
            labelId="categoria-select-label"
            id="categoria-select"
            value={categoria}
            onChange={(data) => {
              setCategoria(data.target.value);
            }}
            className={classes.addDoc}
            fullWidth={true}
          >
            <MenuItem value="artigo">Artigo</MenuItem>
            <MenuItem value="aula">Aula</MenuItem>
            <MenuItem value="resumo">Resumo</MenuItem>
            <MenuItem value="mapa_mental">Mapa Mental</MenuItem>
          </Select>
        </FormControl>
        {categoria !== "mapa_mental" && (
        <FormControl fullWidth={true}>
          <InputLabel id="tipo-select-label">Visibilidade</InputLabel>
          <Select
            labelId="tipo-select-label"
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
        </FormControl>
        )}
        {(tipo === "privado" && categoria !== "mapa_mental") && (
          <FormControl fullWidth={true}>
            <InputLabel id="grupo-select-label">Grupo</InputLabel>
            <Select
              labelId="grupo-select-label"
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
          </FormControl>
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
          <Button
            variant="contained"
            color="primary"
            component="span"
            className={classes.addDoc}
          >
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
