import api from "../../services/api";

export const novaNoticia = (dados, history, token, setOpenAlert, setMessage) => {
  api.post("/noticias/", dados, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((result) => {
      history.push("/noticias");
    })
    .catch((error) => {
      setMessage("erro api noticias");
      setOpenAlert(true);
      console.log(error);
    });
};

export const alterarNoticia = (dados, noticiaId, history, token, setOpenAlert, setMessage) => {
  api.put(`/noticias/${noticiaId}`, dados, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((result) => {
      history.push("/noticias");
    })
    .catch((error) => {
      setMessage("erro api noticias");
      setOpenAlert(true);
      console.log(error);
    });
};

export const apagarNoticia = (noticiaId, history, token, setOpenAlert, setMessage) => {
  api.delete(`/noticias/${noticiaId}`,{
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((result) => {
      history.push("/noticias")
    })
    .catch((error) =>{
      setMessage("erro api noticias");
      setOpenAlert(true);
      console.log(error)
    })
};

