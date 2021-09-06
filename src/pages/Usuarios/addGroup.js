import React, { useContext } from "react"
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core"
import UserContext from "../../contexts/User/UserContext"
import AlertsContext from "../../contexts/Alerts/AlertsContext"
import { addGroupGroup } from "./services"

function AddGroupDialog(props) {
  const { onClose, userId, open } = props
  const { token } = useContext(UserContext)
  const { setOpenAlert, setMessage } = useContext(AlertsContext)

  const handleClose = () => {
    onClose()
  }

  const handleListItemClick = value => {
    addGroupGroup(userId, value, token, setOpenAlert, setMessage)
    onClose()
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Adicionar ao grupo: </DialogTitle>
      <List>
        <ListItem
          autoFocus
          button
          onClick={() => handleListItemClick("ligantes")}
        >
          <ListItemText primary="Ligantes" />
        </ListItem>
        <ListItem
          autoFocus
          button
          onClick={() => handleListItemClick("diretoria")}
        >
          <ListItemText primary="Diretoria" />
        </ListItem>
      </List>
    </Dialog>
  )
}

export default AddGroupDialog
