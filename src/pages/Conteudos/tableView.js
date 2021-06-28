import React, { useState, useContext } from "react";
import { Grid, Chip } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { useStyles } from "../index.style";
import GetDocumento from "./DialogConteudo";
import { getConteudos, getConteudo } from "./services";
import UserContext from "../../contexts/User/UserContext";
import AlertsContext from "../../contexts/Alerts/AlertsContext";

function TableView(props) {
  const { conteudos, setConteudos, loadingpage, setLoading } = props;
  const { token } = useContext(UserContext);
  const { setOpenAlert, setMessage } = useContext(AlertsContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [documento, setDocumento] = useState({
    nome: "",
    data_cadastro: "",
    url: {},
  });
  const classes = useStyles();
  const columns = [
    { field: "nome", headerName: "Nome", flex: 1 },
    { field: "data_cadastro", headerName: "Data Cadastro", flex: 0.5 },
    {
      field: "grupo",
      headerName: "Grupo",
      flex: 0.5,
      renderCell: (params) => {
        let color = "default";
        if (params.value === "diretoria") {
          color = "primary";
        } else if (params.value === "ligantes") {
          color = "secondary";
        }
        return (
          <Chip label={params.value} className={classes.chip} color={color} />
        );
      },
    },
  ];
  const handlerOpen = (data) => {
    getConteudo(setDocumento, data.id, token, setOpenAlert, setMessage);
    setOpenDialog(true);
  };

  const handleCloseDialog = (reload) => {
    setOpenDialog(false);
    if (reload) {
      getConteudos(setConteudos, setLoading, token, setOpenAlert, setMessage);
    }
  };
  return (
    <>
      <Grid>
        <div style={{ height: "73vh", width: "100%" }}>
          <DataGrid
            rows={conteudos}
            columns={columns}
            loading={loadingpage}
            className={classes.tableBackgroud}
            onCellClick={(data) => handlerOpen(data)}
            autoPageSize={true}
          />
        </div>
      </Grid>
      <GetDocumento
        doc={documento}
        open={openDialog}
        onClose={handleCloseDialog}
      />
    </>
  );
}

export default TableView;
