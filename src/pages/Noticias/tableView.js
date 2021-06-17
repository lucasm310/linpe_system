import React from "react";
import { Grid } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { useStyles } from "../index.style";

function TableView(props) {
  const { noticias, handleViewNoticia, loadingpage } = props;
  const classes = useStyles();
  const columns = [
    { field: "data_cadastro", headerName: "Data Cadastro", flex: 0.3 },
    { field: "titulo", headerName: "Titulo", flex: 0.7 },
    { field: "resumo", headerName: "Resumo", flex: 1 },
  ];

  return (
    <Grid>
      <div style={{ height: "73vh", width: "100%" }}>
        <DataGrid
          rows={noticias}
          columns={columns}
          pageSize={7}
          loading={loadingpage}
          className={classes.tableBackgroud}
          onRowClick={(row) => {
            handleViewNoticia(row.row);
          }}
        />
      </div>
    </Grid>
  );
}

export default TableView;
