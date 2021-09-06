import React from "react"
import { Grid, Chip, IconButton } from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import GroupAddIcon from "@material-ui/icons/GroupAdd"
import { DataGrid } from "@material-ui/data-grid"
import { useStyles } from "../index.style"

function TableView(props) {
  const {
    usuarios,
    handleDeleteGroup,
    loadingpage,
    handlerDeleteUsuario,
    handlerAddGroup,
  } = props
  const classes = useStyles()
  const columns = [
    { field: "nome", headerName: "Nome", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 0.6 },
    { field: "data_nascimento", headerName: "Data Nascimento", flex: 0.3 },
    { field: "curso", headerName: "Curso", flex: 0.5 },
    { field: "nivel", headerName: "Nível", flex: 0.3 },
    { field: "status", headerName: "Status", flex: 0.3 },
    {
      field: "grupos",
      headerName: "Grupos",
      flex: 0.8,
      renderCell: params => (
        <>
          {params.value.map((data, idx) => {
            let color = "default"
            if (data === "diretoria") {
              color = "primary"
            } else if (data === "ligantes") {
              color = "secondary"
            }
            return (
              <Chip
                key={idx}
                label={data}
                className={classes.chip}
                color={color}
                onDelete={() => handleDeleteGroup(params, data)}
              />
            )
          })}
        </>
      ),
    },
    {
      field: "",
      headerName: "",
      flex: 0.3,
      renderCell: params => (
        <>
          <IconButton
            aria-label="addgrupo"
            onClick={() => handlerAddGroup(params.id)}
          >
            <GroupAddIcon fontSize="small" />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => handlerDeleteUsuario(params.id)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </>
      ),
    },
  ]

  return (
    <Grid>
      <div style={{ height: "73vh", width: "100%" }}>
        <DataGrid
          rows={usuarios}
          columns={columns}
          pageSize={7}
          className={classes.root}
          loading={loadingpage}
          filterModel={{
            items: [
              {
                columnField: "grupos",
                operatorValue: "contains",
                value: "geral",
              },
            ],
          }}
        />
      </div>
    </Grid>
  )
}

export default TableView
