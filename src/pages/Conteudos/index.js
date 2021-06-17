import React, { useState, useContext, useEffect } from "react";
import { Grid, Typography, Button, ButtonGroup } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import DashboardIcon from "@material-ui/icons/Dashboard";
import TableChartIcon from "@material-ui/icons/TableChart";
import UserContext from "../../contexts/User/UserContext";
import AlertsContext from "../../contexts/Alerts/AlertsContext";
import { getConteudos } from "./services";
import NewDocumento from "./addConteudo";
import TableView from "./tableView";
import CardView from "./cardView";

function Conteudos() {
  const { token, groups, checkExpire } = useContext(UserContext);
  const { setOpenAlert, setMessage } = useContext(AlertsContext);
  const [loadingpage, setLoading] = useState(true);
  const [conteudos, setConteudos] = useState([]);
  const [openNewDoc, setOpenNewDoc] = useState(false);
  const [view, setView] = useState("cards");

  const handleChangeView = (data) => {
    setView(data);
  };

  const handleCloseNewDoc = (reload) => {
    setOpenNewDoc(false);
    if (reload) {
      getConteudos(setConteudos, setLoading, token, setOpenAlert, setMessage);
    }
  };

  useEffect(() => {
    checkExpire();
    getConteudos(setConteudos, setLoading, token, setOpenAlert, setMessage);
  }, [view]);

  return (
    <>
      <Grid container spacing={3} justify="space-between">
        <Grid item>
          <Typography variant="h4" gutterBottom>
            Conteúdos
          </Typography>
        </Grid>

        <Grid item>
          <ButtonGroup color="primary" aria-label="primary button group">
            <IconButton
              aria-label="cards"
              onClick={() => handleChangeView("cards")}
            >
              <DashboardIcon />
            </IconButton>
            <IconButton
              aria-label="table"
              onClick={() => handleChangeView("table")}
            >
              <TableChartIcon />
            </IconButton>
            {groups.includes("diretoria") && (
              <IconButton
                aria-label="add"
                variant="contained"
                color="primary"
                onClick={() => {
                  setOpenNewDoc(true);
                }}
              >
                <AddIcon />
              </IconButton>
            )}
          </ButtonGroup>
        </Grid>
      </Grid>
      {view === "table" && (
        <TableView
          conteudos={conteudos}
          setConteudos={setConteudos}
          loadingpage={loadingpage}
          setLoading={setLoading}
        />
      )}
      {view === "cards" && (
        <CardView
          conteudos={conteudos}
          setConteudos={setConteudos}
          loadingpage={loadingpage}
          setLoading={setLoading}
        />
      )}

      <NewDocumento open={openNewDoc} onClose={handleCloseNewDoc} />
    </>
  );
}

export default Conteudos;
