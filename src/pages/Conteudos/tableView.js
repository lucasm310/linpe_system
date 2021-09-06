import React, { useState, useContext } from "react"
import { Grid, Chip } from "@material-ui/core"
import { DataGrid } from "@material-ui/data-grid"
import { useStyles } from "../index.style"
import EditDocumento from "./editConteudo"
import {
  getConteudos,
  deleteDocumento,
  downloadDoc,
  getConteudo,
} from "./services"
import UserContext from "../../contexts/User/UserContext"
import AlertsContext from "../../contexts/Alerts/AlertsContext"

function TableView(props) {
  const { conteudos, setConteudos, loadingpage, setLoading } = props
  const { token } = useContext(UserContext)
  const { setOpenAlert, setMessage } = useContext(AlertsContext)
  const [openDialog, setOpenDialog] = useState(false)
  const [documento, setDocumento] = useState({})
  const classes = useStyles()
  const columns = [
    { field: "nome", headerName: "Nome", flex: 1 },
    { field: "categoria", headerName: "Categoria", flex: 0.5 },
    { field: "tipo", headerName: "Visibilidade", flex: 0.5 },
    { field: "data_cadastro", headerName: "Data Cadastro", flex: 0.5 },
    {
      field: "grupo",
      headerName: "Grupo",
      flex: 0.5,
      renderCell: params => {
        let color = "default"
        if (params.value === "diretoria") {
          color = "primary"
        } else if (params.value === "ligantes") {
          color = "secondary"
        }
        return (
          <Chip label={params.value} className={classes.chip} color={color} />
        )
      },
    },
  ]
  const handlerOpen = data => {
    getConteudo(
      setDocumento,
      data.id,
      token,
      setOpenAlert,
      setMessage,
      setOpenDialog
    )
  }

  const handlerCloseEdit = () => {
    setOpenDialog(false)
    getConteudos(setConteudos, setLoading, token, setOpenAlert, setMessage)
  }

  const handlerDelete = id => {
    deleteDocumento(id, token, setOpenAlert, setMessage)
    getConteudos(setConteudos, setLoading, token, setOpenAlert, setMessage)
  }

  const handlerDownload = id => {
    downloadDoc(id, token)
  }

  return (
    <>
      <Grid>
        <div style={{ height: "73vh", width: "100%" }}>
          <DataGrid
            rows={conteudos}
            columns={columns}
            loading={loadingpage}
            className={classes.tableBackgroud}
            onCellClick={data => handlerOpen(data)}
            autoPageSize={true}
          />
        </div>
      </Grid>
      <EditDocumento
        open={openDialog}
        onClose={handlerCloseEdit}
        documento={documento}
        onDelete={handlerDelete}
        onDownload={handlerDownload}
      />
    </>
  )
}

export default TableView
