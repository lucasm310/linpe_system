import React, { useState, useContext, useEffect } from "react";
import { Grid, Typography, ButtonGroup, IconButton } from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import TableChartIcon from "@material-ui/icons/TableChart";
import UserContext from "../../contexts/User/UserContext";
import AlertsContext from "../../contexts/Alerts/AlertsContext";
import { deleteGroup, buscarUsuarios, deleteUsuario } from "./services";
import AddGroupDialog from "./addGroup";
import TableView from "./tableView";
import CardView from "./cardView";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const { token, checkExpire } = useContext(UserContext);
  const { setOpenAlert, setMessage } = useContext(AlertsContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [userId, setUserID] = useState(false);
  const [loadingpage, setLoading] = useState(true);
  const [view, setView] = useState("cards");

  const handleDeleteGroup = (id, data) => {
    if (data !== "geral") {
      deleteGroup(setUsuarios, id, data, token, setOpenAlert, setMessage, setLoading);
    }
  };
  const handlerDeleteUsuario = (id) => {
    deleteUsuario(setUsuarios, id, token, setOpenAlert, setMessage, setLoading);
  };

  const handlerAddGroup = (id) => {
    setUserID(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = (value) => {
    setOpenDialog(false);
    buscarUsuarios(setUsuarios, setLoading, token, setOpenAlert, setMessage);
  };

  const handleChangeView = (data) => {
    setView(data);
  };

  useEffect(() => {
    checkExpire();
    buscarUsuarios(setUsuarios, setLoading, token, setOpenAlert, setMessage);
  }, [view]);

  return (
    <>
      <Grid container spacing={3} justify="space-between">
        <Grid item>
          <Typography variant="h4" gutterBottom>
            Usuários
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
          </ButtonGroup>
        </Grid>
      </Grid>
      {view === "table" && (
        <TableView
          usuarios={usuarios}
          handleDeleteGroup={handleDeleteGroup}
          loadingpage={loadingpage}
          handlerDeleteUsuario={handlerDeleteUsuario}
          handlerAddGroup={handlerAddGroup}
        />
      )}
      {view === "cards" && (
        <CardView
          usuarios={usuarios}
          handleDeleteGroup={handleDeleteGroup}
          handlerDeleteUsuario={handlerDeleteUsuario}
          handlerAddGroup={handlerAddGroup}
          loadingpage={loadingpage}
        />
      )}
      <AddGroupDialog
        userId={userId}
        open={openDialog}
        onClose={handleCloseDialog}
      />
    </>
  );
}

export default Usuarios;
