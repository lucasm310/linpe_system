import React, { useState, useEffect } from "react"
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid,
  TextField,
  CircularProgress,
} from "@material-ui/core"
import Pagination from "@material-ui/lab/Pagination"
import { useStyles } from "../index.style"

function CardView(props) {
  const classes = useStyles()
  const { noticias, handleViewNoticia, loadingpage } = props
  const maxPage = 15
  const [newNoticias, setNewNoticias] = useState([])
  const [minPage, setMin] = useState(0)
  const [noticiasPage, setNoticiasPage] = useState(
    newNoticias.slice(minPage, maxPage)
  )
  const [totalPages, setTotalPages] = useState(
    Math.ceil(newNoticias.length / maxPage)
  )

  const handleChangePage = (event, value) => {
    let min = maxPage
    let max = maxPage * value
    if (min === max) {
      min = 0
    }
    setMin(min)
    setMin(max)
    setNoticiasPage(newNoticias.slice(min, max))
  }

  const filter = value => {
    let filterNoticias = []
    value = value.toLowerCase()
    noticias.map(noticia => {
      let titulo = noticia.titulo.toLowerCase()
      if (titulo.includes(value) || titulo === value) {
        filterNoticias.push(noticia)
      }
    })
    setNewNoticias(filterNoticias)
    setTotalPages(Math.ceil(filterNoticias.length / maxPage))
    setNoticiasPage(filterNoticias.slice(0, maxPage))
  }

  useEffect(() => {
    setNewNoticias(noticias)
    setNoticiasPage(noticias.slice(minPage, maxPage))
    setTotalPages(Math.ceil(noticias.length / maxPage))
  }, [noticias])

  return (
    <>
      <Grid container direction="row" justify="flex-end" alignItems="center">
        <TextField
          id="filled-full-width"
          label="Titulo"
          mb={30}
          className={classes.cardViewSearch}
          placeholder="Filtrar pelo Titulo"
          fullWidth={true}
          margin="normal"
          onChange={event => filter(event.target.value)}
        />
      </Grid>
      {loadingpage && (
        <Grid container align="center" justify="center" alignItems="center">
          <CircularProgress className={classes.cardViewLoad} />
        </Grid>
      )}
      <Grid container className={classes.cardViewContainer} spacing={2}>
        {noticiasPage.map((noticia, idx) => (
          <Grid className={classes.cardViewContainerItem} item key={idx}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {noticia.titulo}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  className={classes.cardViewItens}
                >
                  Data de cadastro: {noticia.data_cadastro}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  className={classes.cardViewItens}
                  noWrap={true}
                >
                  {noticia.resumo}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => {
                    handleViewNoticia(noticia)
                  }}
                >
                  Ver
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
  )
}

export default CardView
