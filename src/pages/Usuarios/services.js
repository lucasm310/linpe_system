import api from "../../services/api"

export const buscarUsuarios = (
  setUsuarios,
  setLoading,
  token,
  setOpenAlert,
  setMessage
) => {
  api
    .get("/usuarios/", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(result => {
      result.data.resultados.map(usuario => {
        usuario.id = usuario.username
        usuario.data_nascimento = new Date(
          usuario.data_nascimento
        ).toLocaleDateString("default")
      })
      setLoading(false)
      setUsuarios(result.data.resultados)
    })
    .catch(error => {
      setMessage("erro api usuario")
      setOpenAlert(true)
      console.log(error)
    })
}

export const addGroupGroup = (user, group, token, setOpenAlert, setMessage) => {
  api
    .post(
      `/usuarios/${user}/grupo`,
      {
        grupo: group,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then(result => {
      setMessage("grupo adicionado")
      setOpenAlert(true)
    })
    .catch(error => {
      setMessage("erro api usuario")
      setOpenAlert(true)
      console.log(error)
    })
}

export const deleteGroup = (
  setUsuarios,
  params,
  group,
  token,
  setOpenAlert,
  setMessage,
  setLoading
) => {
  api
    .delete(`/usuarios/${params.id}/grupo`, {
      params: { grupo: group },
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(result => {
      setMessage("grupo deletado")
      setOpenAlert(true)
      buscarUsuarios(setUsuarios, setLoading, token, setOpenAlert, setMessage)
    })
    .catch(error => {
      setMessage("erro api usuario")
      setOpenAlert(true)
      console.log(error)
    })
}

export const deleteUsuario = (
  setUsuarios,
  id,
  token,
  setOpenAlert,
  setMessage,
  setLoading
) => {
  api
    .delete(`/usuarios/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(result => {
      buscarUsuarios(setUsuarios, setLoading, token, setOpenAlert, setMessage)
    })
    .catch(error => {
      setMessage("erro api usuario")
      setOpenAlert(true)
      console.log(error)
    })
}
