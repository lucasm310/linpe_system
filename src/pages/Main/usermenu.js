import React, { useState, useEffect, useRef, useContext } from "react"
import {
  Avatar,
  Button,
  ClickAwayListener,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography,
} from "@material-ui/core"
import { Auth } from "aws-amplify"
import UserContext from "../../contexts/User/UserContext"
import AlertsContext from "../../contexts/Alerts/AlertsContext"
import { useStyles } from "../index.style"
import Perfil from "./perfil"
import api from "../../services/api"

var getInitials = function (name) {
  var parts = name.split(" ")
  var initials = ""
  for (var i = 0; i < parts.length; i++) {
    if (parts[i].length > 0 && parts[i] !== "") {
      initials += parts[i][0]
    }
  }
  return initials
}

export default function UserMenu() {
  const [open, setOpen] = useState(false)
  const [userinit, setUserinit] = useState("")
  const anchorRef = useRef(null)
  const { user, groups, token, setLogged, openPerfil, setOpenPerfil } =
    useContext(UserContext)
  const { setOpenAlert, setMessage } = useContext(AlertsContext)
  const prevOpen = useRef(open)
  const classes = useStyles()

  const handleClosePerfil = () => {
    setOpenPerfil(false)
  }

  const handleOpenPerfil = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }
    setOpen(false)
    setOpenPerfil(true)
  }

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen)
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

  const logout = event => {
    Auth.signOut()
    setLogged(false)
  }

  const solicitar_ligantes = event => {
    api
      .post(
        "usuarios/solicitacoes_ligante/",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(result => {
        setMessage("Solicitação enviada para a Diretoria! Obrigado!")
        setOpenAlert(true)
      })
      .catch(error => {
        setMessage("Erro ao enviar solicitação para a Diretoria!")
        setOpenAlert(true)
        console.log(error)
      })
  }

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus()
    }
    prevOpen.current = open
  }, [open])

  useEffect(() => {
    if (user) {
      var initials = getInitials(user.attributes.name)
      setUserinit(initials)
    }
  }, [user])

  return (
    <div>
      <Button
        color="inherit"
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Avatar>{userinit}</Avatar>
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        placement="bottom-end"
      >
        <Paper>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.username}
          >
            {user && user.attributes.name}
          </Typography>
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList
              autoFocusItem={open}
              id="menu-list-grow"
              onKeyDown={handleListKeyDown}
            >
              <MenuItem onClick={handleOpenPerfil}>Perfil</MenuItem>
              {!groups.includes("ligantes") &&
                !groups.includes("diretoria") &&
                groups.includes("geral") && (
                  <MenuItem onClick={solicitar_ligantes}>
                    Quero ser Ligante!
                  </MenuItem>
                )}
              <MenuItem onClick={logout}>Logout</MenuItem>
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
      <Perfil onClose={handleClosePerfil} open={openPerfil} />
    </div>
  )
}
