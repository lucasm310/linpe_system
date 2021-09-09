import api from "../../services/api"

export const buscarNoticias = (
  setNoticias,
  setLoading,
  setOpenAlert,
  setMessage
) => {
  api
    .get("/noticias/", {})
    .then(result => {
      result.data.resultados.map(noticia => {
        noticia.id = noticia.noticiaID
        noticia.data_cadastro = new Date(noticia.data_cadastro).toLocaleString(
          "default"
        )
      })
      setNoticias(result.data.resultados)
      setLoading(false)
    })
    .catch(error => {
      setMessage("erro api noticias")
      setOpenAlert(true)
      console.log(error)
    })
}
