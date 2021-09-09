import React, { useState, useContext, useEffect } from "react"
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  TextField,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core"
import UserContext from "../../contexts/User/UserContext"
import AlertsContext from "../../contexts/Alerts/AlertsContext"
import { Auth } from "aws-amplify"

function Perfil(props) {
  const { onClose, open } = props
  const [nome, setNome] = useState("")
  const [telefone, setTelefone] = useState()
  const [dataNascimento, setDataNascimento] = useState()
  const [curso, setCurso] = useState()
  const [nivel, SetNivel] = useState()
  const { user } = useContext(UserContext)
  const { setOpenAlert, setMessage } = useContext(AlertsContext)

  const handleClose = () => {
    onClose()
  }

  const handlerSalvar = () => {
    let telefoneFormat = ""
    if (telefone.startsWith("+55")) {
      telefoneFormat = telefone
    } else {
      telefoneFormat = `+55${telefone}`
    }
    Auth.currentAuthenticatedUser()
      .then(resuser => {
        Auth.updateUserAttributes(resuser, {
          name: nome,
          "custom:curso": curso,
          phone_number: telefoneFormat,
          birthdate: dataNascimento,
          "custom:nivel": nivel,
        })
          .then(res => {
            setMessage("perfil alterado")
            setOpenAlert(true)
            onClose()
          })
          .catch(res => {
            setMessage("erro na api perfil")
            setOpenAlert(true)
            console.error(`erro ao atualizar user: ${res}`)
            onClose()
          })
      })
      .catch(err => {
        setMessage("erro na api perfil")
        setOpenAlert(true)
        console.log(`erro ao buscar sessao ${err}`)
        onClose()
      })
  }

  useEffect(() => {
    if (user) {
      setNome(user.attributes.name)
      setTelefone(user.attributes["phone_number"])
      setDataNascimento(user.attributes["birthdate"])
      setCurso(user.attributes["custom:curso"])
      SetNivel(user.attributes["custom:nivel"])
    }
  }, [user])

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      open={open}
    >
      <DialogTitle id="form-dialog-title">Perfil</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          error={!nome}
          margin="dense"
          id="name"
          label="Nome"
          value={nome}
          onChange={data => {
            setNome(data.target.value)
          }}
          required
          fullWidth
        />
        <TextField
          margin="dense"
          id="email"
          label="Email"
          type="email"
          value={user && user.attributes.email}
          fullWidth
          disabled
        />
        <TextField
          error={!dataNascimento}
          margin="dense"
          id="data_nascimento"
          type="date"
          label="Data Nascimento"
          value={dataNascimento}
          onChange={data => {
            setDataNascimento(data.target.value)
          }}
          InputLabelProps={{
            shrink: true,
          }}
          required
          fullWidth
        />
        <TextField
          error={!telefone}
          margin="dense"
          id="telefone"
          label="Telefone"
          value={telefone}
          onChange={data => {
            setTelefone(data.target.value)
          }}
          required
          fullWidth
        />
        <TextField
          error={!curso}
          margin="dense"
          id="curso"
          label="Curso"
          value={curso}
          onChange={data => {
            setCurso(data.target.value)
          }}
          required
          fullWidth
        />
        <InputLabel id="nivel-especializacao">Nível Especialização</InputLabel>
        <Select
          error={!nivel}
          margin="dense"
          labelId="nivel-especializacao"
          id="nivel-especializacao"
          onChange={event => {
            SetNivel(event.target.value)
          }}
          value={nivel}
          required
          fullWidth
        >
          <MenuItem value="bacharelado">Bacharelado</MenuItem>
          <MenuItem value="licenciatura">Licenciatura</MenuItem>
          <MenuItem value="tecnólogo">Tecnólogo</MenuItem>
          <MenuItem value="especialização">Especialização</MenuItem>
          <MenuItem value="mba">MBA</MenuItem>
          <MenuItem value="mestrado">Mestrado</MenuItem>
          <MenuItem value="doutorado">Doutorado</MenuItem>
          <MenuItem value="pos-doutorado">Pós-doutorado</MenuItem>
        </Select>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={() => {
            handlerSalvar()
          }}
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Perfil
