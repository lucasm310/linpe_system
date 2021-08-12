import React, { useState, useContext, useEffect } from "react";
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
import { editDocumento } from "./services";

function EditDocumento(props) {
  const { onClose, open, documento, onDelete, onDownload } = props;
  const [nome, setNome] = useState(documento.nome);
  const [grupo, setGrupo] = useState(documento.grupo);
  const [tipo, setTipo] = useState(documento.tipo);
  const [categoria, setCategoria] = useState(documento.categoria);
  const { token, groups } = useContext(UserContext);
  const { setOpenAlert, setMessage } = useContext(AlertsContext);
  const history = useHistory();

  const classes = useStyles();

  const handleClose = () => {
    onClose();
  };

  const handlerSalvar = () => {
    let dados = {
      nome: nome,
      grupo: grupo,
      tipo: tipo,
      categoria: categoria,
    };
    if (categoria === "mapa_mental") {
      dados.tipo = "publico";
      dados.grupo = "geral";
    }
    editDocumento(
      dados,
      documento.id,
      history,
      token,
      setOpenAlert,
      setMessage
    );
    onClose(true);
  };

  const handlerDelete = () => {
    onDelete(documento.id);
    onClose(true);
  };

  const handlerDownload = () => {
    onDownload(documento.id);
    onClose(true);
  };

  useEffect(() => {
    setNome(documento.nome);
    setGrupo(documento.grupo);
    setTipo(documento.tipo);
    setCategoria(documento.categoria);
  }, [documento]);

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      open={open}
    >
      <DialogTitle id="form-dialog-title">Editar Conteúdo</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          disabled={!groups.includes("diretoria")}
          margin="dense"
          id="name"
          label="Nome"
          value={nome}
          onChange={(data) => {
            setNome(data.target.value);
          }}
          className={classes.addDoc}
          fullWidth={true}
        />
        <FormControl fullWidth={true}>
          <InputLabel id="categoria-select-label">Categoria</InputLabel>
          <Select
            disabled={!groups.includes("diretoria")}
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
              disabled={!groups.includes("diretoria")}
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
        {tipo === "privado" && categoria !== "mapa_mental" && (
          <FormControl fullWidth={true}>
            <InputLabel id="grupo-select-label">Grupo</InputLabel>
            <Select
              disabled={!groups.includes("diretoria")}
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
      </DialogContent>
      <DialogActions>
        {groups.includes("diretoria") && (
          <>
            <Button
              color="secondary"
              onClick={() => {
                handlerSalvar();
              }}
            >
              Salvar
            </Button>
            <Button
              color="secondary"
              onClick={() => {
                handlerDelete();
              }}
            >
              Apagar
            </Button>
          </>
        )}
        <Button
          color="primary"
          onClick={() => {
            handlerDownload();
          }}
        >
          Baixar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditDocumento;
