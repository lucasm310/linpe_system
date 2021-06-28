import api from "../../services/api";

export const getConteudos = ( setData, setLoading, token, setOpenAlert, setMessage) => {
  api.get("/documentos/", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((result) => {
      result.data.resultados.map((documento) => {
        documento.id = documento.documentoID;
        documento.data_cadastro = new Date(
          documento.data_cadastro
        ).toLocaleString("default");
      });
      setData(result.data.resultados);
      setLoading(false);
    })
    .catch((error) => {
      setMessage("erro api documentos");
      setOpenAlert(true);
      console.log(error);
    });
};

export const getConteudo = (setData, id, token, setOpenAlert, setMessage) => {
  api
    .get(`/documentos/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((result) => {
      result.data.resultados.map((documento) => {
        documento.id = documento.documentoID;
      });
      setData(result.data.resultados[0]);
    })
    .catch((error) => {
      setMessage("erro api documentos");
      setOpenAlert(true);
      console.log(error);
    });
};

export const downloadDoc = (id, token) => {
  api
    .get(`/documentos/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((result) => {
      var link = document.createElement("a");
      link.href = result.data.resultados[0].url.url;
      link.download = result.data.resultados[0].nome;
      document.body.appendChild(link);
      link.click();
      setTimeout(function () {
        window.URL.revokeObjectURL(link);
      }, 200);
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
};

export const upload = (
  documentoId,
  fileUpload,
  history,
  token,
  setOpenAlert,
  setMessage
) => {
  api
    .post("/upload/", fileUpload, {
      headers: {
        Authorization: `Bearer ${token}`,
        documento_id: documentoId,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((result) => {
      history.push("/conteudos");
    })
    .catch((error) => {
      setMessage("erro api upload");
      setOpenAlert(true);
      console.log(error);
    });
};

export const novoDocumento = (
  dados,
  file,
  history,
  token,
  setOpenAlert,
  setMessage
) => {
  api
    .post("/documentos/", dados, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((result) => {
      upload(
        result.data.documentoID,
        file,
        history,
        token,
        setOpenAlert,
        setMessage
      );
    })
    .catch((error) => {
      setMessage("erro api documentos");
      setOpenAlert(true);
      console.log(error);
    });
};

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
    .then((result) => {
      setMessage("documento deletado");
      setOpenAlert(true);
    })
    .catch((error) => {
      setMessage("erro api documentos");
      setOpenAlert(true);
      console.log(error);
    });
};
