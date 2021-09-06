import api from "../../services/api"
import axios from "axios"

export const getConteudos = (
  setData,
  setLoading,
  token,
  setOpenAlert,
  setMessage
) => {
  api
    .get("/documentos/", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(result => {
      result.data.resultados.map(documento => {
        documento.id = documento.documentoID
        documento.data_cadastro = new Date(
          documento.data_cadastro
        ).toLocaleString("default")
      })
      setData(result.data.resultados)
      setLoading(false)
    })
    .catch(error => {
      setMessage("erro api documentos")
      setOpenAlert(true)
      console.log(error)
    })
}

export const getConteudo = (
  setData,
  id,
  token,
  setOpenAlert,
  setMessage,
  setOpenDialog
) => {
  api
    .get(`/documentos/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(result => {
      result.data.resultados.map(documento => {
        documento.id = documento.documentoID
      })
      setData(result.data.resultados[0])
      setOpenDialog(true)
    })
    .catch(error => {
      setMessage("erro api documentos")
      setOpenAlert(true)
      console.log(error)
    })
}

export const downloadDoc = (id, token) => {
  api
    .get(`/documentos/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(result => {
      var link = document.createElement("a")
      link.href = result.data.resultados[0].url
      link.download = result.data.resultados[0].nome
      document.body.appendChild(link)
      link.click()
      setTimeout(function () {
        window.URL.revokeObjectURL(link)
      }, 200)
    })
    .catch(error => {
      console.log(error)
      return false
    })
}

export const upload = (
  data,
  fileUpload,
  onClose,
  setOpenAlert,
  setMessage,
  setCarregando
) => {
  const formData = new FormData()
  formData.append("key", data.fields_upload.key)
  formData.append("AWSAccessKeyId", data.fields_upload.AWSAccessKeyId)
  formData.append("policy", data.fields_upload.policy)
  formData.append("signature", data.fields_upload.signature)
  formData.append(
    "x-amz-security-token",
    data.fields_upload["x-amz-security-token"]
  )
  formData.append("file", fileUpload)
  console.log(formData)
  axios
    .post(data.url_upload, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(result => {
      setMessage("Documento cadastrado")
      setOpenAlert(true)
      setCarregando(false)
      onClose(true)
    })
    .catch(error => {
      setMessage("erro api upload")
      setCarregando(false)
      setOpenAlert(true)
      console.log(error)
    })
}

export const novoDocumento = (
  dados,
  file,
  onClose,
  token,
  setOpenAlert,
  setMessage,
  setCarregando
) => {
  api
    .post("/documentos/", dados, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(result => {
      // console.log(result)
      // console.log(file)
      upload(
        result.data,
        file,
        onClose,
        setOpenAlert,
        setMessage,
        setCarregando
      )
    })
    .catch(error => {
      setMessage("erro api documentos")
      setOpenAlert(true)
      setCarregando(false)
      console.log(error)
    })
}

export const editDocumento = (
  dados,
  documentoId,
  onClose,
  token,
  setOpenAlert,
  setMessage
) => {
  api
    .put(`/documentos/${documentoId}`, dados, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(result => {
      setMessage("Documento alterado")
      setOpenAlert(true)
      onClose()
    })
    .catch(error => {
      setMessage("erro api documentos")
      setOpenAlert(true)
      console.log(error)
    })
}

export const deleteDocumento = (
  documentoId,
  token,
  setOpenAlert,
  setMessage
) => {
  api
    .delete(`/documentos/${documentoId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(result => {
      setMessage("Documento apagado")
      setOpenAlert(true)
    })
    .catch(error => {
      setMessage("erro api documentos")
      setOpenAlert(true)
      console.log(error)
    })
}
