import React, { useState, useEffect } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid,
  TextField,
  Chip,
  CircularProgress,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { useStyles } from "../index.style";

function Grupo(props) {
  const { user, grupo, handleDeleteGroup } = props;
  let color = "default";
  if (grupo == "diretoria") {
    color = "primary";
  } else if (grupo == "ligantes") {
    color = "secondary";
  }
  return (
    <Chip
      label={grupo}
      color={color}
      onDelete={() => handleDeleteGroup(user, grupo)}
    />
  );
}

function CardView(props) {
  const classes = useStyles();
  const {
    usuarios,
    handleDeleteGroup,
    handlerDeleteUsuario,
    handlerAddGroup,
    loadingpage,
  } = props;
  const fixMaxPage = 15;
  const [newUsuarios, setNewUsuarios] = useState([]);
  const [maxPage, setMax] = useState(fixMaxPage);
  const [minPage, setMin] = useState(0);
  const [usuariosPage, setUsuariosPage] = useState(
    newUsuarios.slice(minPage, maxPage)
  );
  const [totalPages, setTotalPages] = useState(
    Math.ceil(newUsuarios.length / fixMaxPage)
  );

  const handleChangePage = (event, value) => {
    let min = maxPage;
    let max = maxPage * value;
    if (min === max) {
      min = 0;
    }
    setMin(min);
    setMin(max);
    setUsuariosPage(newUsuarios.slice(min, max));
  };

  const filter = (value, campo) => {
    let filterUsuarios = [];
    value = value.toLowerCase();
    usuarios.map((usuario) => {
      let nome = usuario.nome.toLowerCase();
      let email = usuario.email;
      if (campo === "nome") {
        if (nome.includes(value) || nome === value) {
          filterUsuarios.push(usuario);
        }
      } else if (campo === "email") {
        if (email.includes(value) || email === value) {
          filterUsuarios.push(usuario);
        }
      }
    });
    setNewUsuarios(filterUsuarios);
    setTotalPages(Math.ceil(filterUsuarios.length / fixMaxPage));
    setUsuariosPage(filterUsuarios.slice(0, fixMaxPage));
  };

  useEffect(() => {
    setNewUsuarios(usuarios);
    setUsuariosPage(usuarios.slice(minPage, maxPage));
    setTotalPages(Math.ceil(usuarios.length / fixMaxPage));
  }, [usuarios]);

  return (
    <>
      <Grid container direction="row" justify="space-between">
        <Grid item xs={12} sm={6} style={{ paddingLeft: 5, paddingRight: 5 }}>
          <TextField
            id="filled-full-width"
            label="Nome"
            className={classes.cardViewSearch}
            placeholder="Filtrar pelo Nome"
            margin="normal"
            fullWidth={true}
            onChange={(event) => filter(event.target.value, "nome")}
          />
        </Grid>
        <Grid item xs={12} sm={6} style={{ paddingLeft: 5, paddingRight: 5 }}>
          <TextField
            id="filled-full-width"
            label="Email"
            className={classes.cardViewSearch}
            placeholder="Filtrar pelo Email"
            margin="normal"
            fullWidth={true}
            onChange={(event) => filter(event.target.value, "email")}
          />
        </Grid>
      </Grid>
      {loadingpage && (
        <Grid container align="center" justify="center" alignItems="center">
          <CircularProgress className={classes.cardViewLoad} />
        </Grid>
      )}
      <Grid container className={classes.cardViewContainer} spacing={2}>
        {usuariosPage.map((usuario, idx) => (
          <Grid className={classes.cardViewContainerItem} item key={idx}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {usuario.nome}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  className={classes.cardViewItens}
                >
                  Email: {usuario.email}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  className={classes.cardViewItens}
                >
                  Data Nascimento: {usuario.data_nascimento}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  className={classes.cardViewItens}
                >
                  Telefone: {usuario.telefone}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  className={classes.cardViewItens}
                >
                  Curso: {usuario.curso}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  className={classes.cardViewItens}
                >
                  Nível: {usuario.nivel}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  className={classes.cardViewItens}
                >
                  Status: {usuario.status}
                </Typography>
                {usuario.grupos.map((grupo, idx) => (
                  <Grupo
                    key={idx}
                    user={usuario}
                    grupo={grupo}
                    handleDeleteGroup={handleDeleteGroup}
                  />
                ))}
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => handlerAddGroup(usuario.id)}
                >
                  Adicionar Grupo
                </Button>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => handlerDeleteUsuario(usuario.id)}
                >
                  Apagar
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Grid
        container
        direction="row"
        justify="flex-end"
        alignItems="center"
        className={classes.cardViewPaginator}
      >
        <Pagination count={totalPages} onChange={handleChangePage} />
      </Grid>
    </>
  );
}

export default CardView;
