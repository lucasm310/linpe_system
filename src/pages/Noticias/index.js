import React, { useState, useEffect, useContext } from "react"
import { useHistory } from "react-router-dom"
import { Grid, Typography, ButtonGroup, IconButton } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import DashboardIcon from "@material-ui/icons/Dashboard"
import TableChartIcon from "@material-ui/icons/TableChart"
import { buscarNoticias } from "./services"
import AlertsContext from "../../contexts/Alerts/AlertsContext"
import TableView from "./tableView"
import CardView from "./cardView"

function Noticias() {
  const [noticias, setNoticias] = useState([])
  const history = useHistory()
  const [loadingpage, setLoading] = useState(true)
  const { setOpenAlert, setMessage } = useContext(AlertsContext)
  const [view, setView] = useState("cards")

  const handleOpenForm = () => {
    history.push("/novanoticia")
  }

  const handleViewNoticia = noticia => {
    history.push("/novanoticia", noticia)
  }

  const handleChangeView = data => {
    setView(data)
  }

  useEffect(() => {
    buscarNoticias(setNoticias, setLoading, setOpenAlert, setMessage)
  }, [view])

  return (
    <>
      <Grid container spacing={3} justify="space-between">
        <Grid item>
          <Typography variant="h4" gutterBottom>
            Noticias
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
            <IconButton
              aria-label="add"
              variant="contained"
              color="primary"
              onClick={handleOpenForm}
            >
              <AddIcon />
            </IconButton>
          </ButtonGroup>
        </Grid>
      </Grid>
      {view === "table" && (
        <TableView
          noticias={noticias}
          handleViewNoticia={handleViewNoticia}
          loadingpage={loadingpage}
        />
      )}
      {view === "cards" && (
        <CardView
          noticias={noticias}
          handleViewNoticia={handleViewNoticia}
          loadingpage={loadingpage}
        />
      )}
    </>
  )
}

export default Noticias
