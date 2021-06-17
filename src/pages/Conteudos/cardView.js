import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid,
  Chip,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import UserContext from "../../contexts/User/UserContext";
import AlertsContext from "../../contexts/Alerts/AlertsContext";
import { deleteDocumento, downloadDoc } from "./services";
import { useStyles } from "../index.style";

function Grupo(props) {
  const { grupo } = props;
  let color = "default";
  if (grupo == "diretoria") {
    color = "primary";
  } else if (grupo == "ligantes") {
    color = "secondary";
  }
  return <Chip label={grupo} color={color} />;
}

function CardView(props) {
  const classes = useStyles();
  const { conteudos, loadingpage } = props;
  const { token, groups } = useContext(UserContext);
  const { setOpenAlert, setMessage } = useContext(AlertsContext);
  const fixMaxPage = 15;
  const [newConteudos, setNewConteudos] = useState([]);
  const [maxPage, setMax] = useState(fixMaxPage);
  const [minPage, setMin] = useState(0);
  const [conteudosPage, setConteudosPage] = useState(
    newConteudos.slice(minPage, maxPage)
  );
  const [totalPages, setTotalPages] = useState(
    Math.ceil(newConteudos.length / fixMaxPage)
  );

  const handleChangePage = (event, value) => {
    let min = maxPage;
    let max = maxPage * value;
    if (min === max) {
      min = 0;
    }
    setMin(min);
    setMin(max);
    setConteudosPage(newConteudos.slice(min, max));
  };

  const handlerDelete = (id) => {
    deleteDocumento(id, token, setOpenAlert, setMessage);
    let filterConteudo = [];
    conteudos.map((conteudo) => {
      if (conteudo.id !== id) {
        filterConteudo.push(conteudo);
      }
    });
    setNewConteudos(filterConteudo);
    setTotalPages(Math.ceil(filterConteudo.length / fixMaxPage));
    setConteudosPage(filterConteudo.slice(0, fixMaxPage));
  };

  const handlerDownload = (id) => {
    downloadDoc(id, token);
  };

  const filter = (value) => {
    let filterConteudo = [];
    value = value.toLowerCase();
    conteudos.map((conteudo) => {
      let nome = conteudo.nome.toLowerCase();
      if (nome.includes(value) || nome === value) {
        filterConteudo.push(conteudo);
      }
    });
    setNewConteudos(filterConteudo);
    setTotalPages(Math.ceil(newConteudos.length / fixMaxPage));
    setConteudosPage(filterConteudo.slice(0, fixMaxPage));
  };

  useEffect(() => {
    setNewConteudos(conteudos);
    setConteudosPage(conteudos.slice(minPage, maxPage));
    setTotalPages(Math.ceil(conteudos.length / fixMaxPage));
  }, [conteudos]);

  return (
    <>
      <Grid container direction="row" justify="flex-end" alignItems="center">
        <TextField
          id="filled-full-width"
          label="Nome"
          mb={30}
          placeholder="Pesquisar por nome"
          fullWidth={true}
          margin="normal"
          onChange={(event) => filter(event.target.value)}
          className={classes.cardViewSearch}
        />
      </Grid>
      {loadingpage && (
        <Grid container align="center" justify="center" alignItems="center">
          <CircularProgress className={classes.cardViewLoad} />
        </Grid>
      )}
      <Grid container className={classes.cardViewContainer} spacing={2}>
        {conteudosPage.map((conteudo, idx) => (
          <Grid item key={idx} className={classes.cardViewContainerItem}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {conteudo.nome}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  className={classes.cardViewItens}
                >
                  Data de cadastro: {conteudo.data_cadastro}
                </Typography>
                <Grupo grupo={conteudo.grupo} className={classes.cardViewItens} />
              </CardContent>
              <CardActions>
                {groups.includes("diretoria") && (
                  <Button
                    size="small"
                    color="secondary"
                    onClick={() => {
                      handlerDelete(conteudo.id);
                    }}
                  >
                    Apagar
                  </Button>
                )}
                <Button
                  size="small"
                  color="primary"
                  onClick={() => {
                    handlerDownload(conteudo.id, conteudo.nome);
                  }}
                >
                  Baixar
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
