import api from "../../services/api";

export const getEventos = (setData, setLoading, token, setOpenAlert, setMessage) => {
  setLoading(true);
  api.get("/eventos/", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((result) => {
      if (result.status == 200) {
        setData(result.data.resultados);
        setLoading(false);
      }
    })
    .catch((error) => {
      setMessage("erro api eventos");
      setOpenAlert(true);
      console.log(error);
    });
};

export const novoEvento = ( dados, setData, setLoading, token, setOpenAlert, setMessage) => {
  api.post(
      "/eventos/",
      {
        data_inicio: Math.floor(+new Date(dados.startDate) / 1000),
        data_fim: Math.floor(+new Date(dados.endDate) / 1000),
        nome: dados.title,
        descricao: dados.notes,
        grupo: dados.grupo,
        all_day: dados.allDay,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((result) => {
      getEventos(setData, setLoading, token, setOpenAlert, setMessage);
    })
    .catch((error) => {
      setMessage("erro api eventos");
      setOpenAlert(true);
      console.log(error);
    });
};

export const deleteEvento = ( eventoID, setData, setLoading, token, setOpenAlert, setMessage) => {
  api.delete(`/eventos/${eventoID}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((result) => {
      getEventos(setData, setLoading, token);
    })
    .catch((error) => {
      setMessage("erro api eventos");
      setOpenAlert(true);
      console.log(error);
    });
};

export const atualizaEvento = ( eventoID, dados, setData, setLoading, token, setOpenAlert, setMessage) => {
  var dadosMap = {};
  Object.keys(dados).map((key) => {
    if (key === "title") {
      dadosMap["nome"] = dados[key];
    } else if (key === "notes") {
      dadosMap["descricao"] = dados[key];
    } else if (key === "startDate") {
      dadosMap["data_inicio"] = dados[key];
    } else if (key === "endDate") {
      dadosMap["data_fim"] = dados[key];
    } else {
      dadosMap[key] = dados[key];
    }
  });
  api.put(`/eventos/${eventoID}`, dadosMap, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((result) => {
      getEventos(setData, setLoading, token, setOpenAlert, setMessage);
    })
    .catch((error) => {
      setMessage("erro api eventos");
      setOpenAlert(true);
      console.log(error);
    });
};
