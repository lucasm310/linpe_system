import React, { useState, useEffect, useRef, useContext } from "react"
import {
  IconButton,
  Badge,
  ClickAwayListener,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListSubheader,
  Paper,
  Popper,
} from "@material-ui/core"
import NotificationsIcon from "@material-ui/icons/Notifications"
import CheckIcon from "@material-ui/icons/Check"
import CloseIcon from "@material-ui/icons/Close"
import { green, red } from "@material-ui/core/colors"
import { useLocation } from "react-router-dom"
import UserContext from "../../contexts/User/UserContext"
import AlertsContext from "../../contexts/Alerts/AlertsContext"
import api from "../../services/api"
import { useStyles } from "../index.style"

function AlertMenu() {
  const [open, setOpen] = useState(false)
  const [totalNotificao, setTotalNotificao] = useState(0)
  const [solicitacoes, setSolicitacoes] = useState([])
  const anchorRef = useRef(null)
  const prevOpen = useRef(open)
  const { user, groups, token, logged } = useContext(UserContext)
  const { setOpenAlert, setMessage } = useContext(AlertsContext)
  const location = useLocation()
  const classes = useStyles()

  const buscaSolicitacaoLigantes = () => {
    api
      .get("usuarios/solicitacoes_ligante", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(result => {
        setTotalNotificao(result.data.resultados.length)
        setSolicitacoes(result.data.resultados)
      })
      .catch(error => {
        setMessage("Erro ao buscar solicitação ligantes")
        setOpenAlert(true)
        console.log(error)
      })
  }
  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }
    setOpen(false)
  }

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault()
      setOpen(false)
    }
  }

  const handleToggle = () => {
    if (groups.includes("diretoria")) {
      setOpen(prevOpen => !prevOpen)
    }
  }

  const handleSolicitacoes = (username, status) => {
    api
      .post(
        `usuarios/solicitacoes_ligante/${username}/${status}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(result => {
        setMessage(`Ação de ${status} a solicitação, feita com sucesso`)
        setOpenAlert(true)
      })
      .catch(error => {
        setMessage(`Erro em ${status} solicitação`)
        setOpenAlert(true)
        console.log(error)
      })
  }

  useEffect(() => {
    if (user && groups.includes("diretoria")) {
      buscaSolicitacaoLigantes()
    }
  }, [location, token])

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus()
    }
    prevOpen.current = open
  }, [open])

  return (
    <>
      <IconButton color="inherit" onClick={handleToggle} ref={anchorRef}>
        <Badge badgeContent={totalNotificao} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        placement="bottom-end"
        style={{ width: 350 }}
      >
        <Paper>
          <ClickAwayListener onClickAway={handleClose}>
            <List id="menu-list-grow" onKeyDown={handleListKeyDown}>
              <ListSubheader component="div" id="nested-list-subheader">
                Solicitações para fazer parte dos Ligantes
              </ListSubheader>
              {solicitacoes.map((solicitacao, idx) => (
                <ListItem alignItems="flex-start" key={idx}>
                  <ListItemText
                    primary={solicitacao.nome}
                    secondary={solicitacao.email}
                  />
                  <ListItemSecondaryAction className={classes.alertsItem}>
                    <IconButton
                      edge="end"
                      aria-label="aprovar"
                      onClick={() => {
                        handleSolicitacoes(solicitacao.username, "aprovar")
                      }}
                    >
                      <CheckIcon style={{ color: green[500] }} />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="negar"
                      onClick={() => {
                        handleSolicitacoes(solicitacao.username, "negar")
                      }}
                    >
                      <CloseIcon style={{ color: red[500] }} />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </>
  )
}

export default AlertMenu
