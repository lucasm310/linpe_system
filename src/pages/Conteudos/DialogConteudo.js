import React, { useContext } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Button,
  DialogContent,
} from "@material-ui/core";
import UserContext from "../../contexts/User/UserContext";
import AlertsContext from "../../contexts/Alerts/AlertsContext";
import { deleteDocumento } from "./services";

function GetDocumento(props) {
  const { onClose, doc, open } = props;
  const { token, groups } = useContext(UserContext);
  const { setOpenAlert, setMessage } = useContext(AlertsContext);
  const handleClose = () => {
    onClose();
  };

  const handlerDelete = () => {
    deleteDocumento(doc.id, token, setOpenAlert, setMessage);
    onClose(true);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      open={open}
    >
      <DialogTitle id="form-dialog-title">Documento</DialogTitle>
      <DialogContent>
        <DialogContentText>{doc.nome}</DialogContentText>
        <DialogContentText>{doc.data_cadastro}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {groups.includes("diretoria") && (
          <Button color="secondary" onClick={handlerDelete}>
            Apagar
          </Button>
        )}
        <Button color="primary" href={doc.url.url}>
          Baixar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default GetDocumento;
