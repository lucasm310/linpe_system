import React, { useState, useEffect, useContext } from "react"
import {
  Grid,
  Typography,
  Button,
  ButtonGroup,
  TextField,
} from "@material-ui/core/"
import { convertToRaw, EditorState, ContentState } from "draft-js"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import { useHistory } from "react-router-dom"
import { Editor } from "react-draft-wysiwyg"
import draftToHtml from "draftjs-to-html"
import htmlToDraft from "html-to-draftjs"
import UserContext from "../../contexts/User/UserContext"
import AlertsContext from "../../contexts/Alerts/AlertsContext"
import { novaNoticia, alterarNoticia, apagarNoticia } from "./services"
import { useStyles } from "../index.style"

function NovaNoticia(props) {
  const classes = useStyles()
  const [noticiaId, setNoticiaId] = useState()
  const [novoTitulo, setTitulo] = useState()
  const [novoResumo, setResumo] = useState()
  const [novoConteudo, setConteudo] = useState()
  const [modo, setModo] = useState("post")
  const history = useHistory()
  const { token, user, checkExpire } = useContext(UserContext)
  const { setOpenAlert, setMessage } = useContext(AlertsContext)

  async function handlerSalvar() {
    const conteudoConvertido = draftToHtml(
      convertToRaw(novoConteudo.getCurrentContent())
    )
    let dados = {
      titulo: novoTitulo,
      resumo: novoResumo,
      conteudo: conteudoConvertido,
      usuario_id: user.username,
    }
    if (modo === "post") {
      novaNoticia(dados, history, token, setOpenAlert, setMessage)
    } else {
      alterarNoticia(dados, noticiaId, history, token, setOpenAlert, setMessage)
    }
  }

  const handlerVoltar = () => {
    history.push("/noticias")
  }

  async function handlerApagar() {
    apagarNoticia(noticiaId, history, token, setOpenAlert, setMessage)
  }

  useEffect(() => {
    checkExpire()
    if (props.location.state !== undefined) {
      const noticia = props.location.state
      setNoticiaId(noticia.noticiaID)
      setTitulo(noticia.titulo)
      setResumo(noticia.resumo)
      const blockHtmls = htmlToDraft(noticia.conteudo)
      const contentState = ContentState.createFromBlockArray(
        blockHtmls.contentBlocks
      )
      const editorState = EditorState.createWithContent(contentState)
      setConteudo(editorState)
      setModo("put")
    }
  }, [props])

  return (
    <>
      <Grid container spacing={3} justify="space-between">
        <Grid item>
          <Typography variant="h4" gutterBottom>
            {modo === "post" ? "Nova Noticia" : "Noticia"}
          </Typography>
        </Grid>
        <Grid item>
          <ButtonGroup
            variant="contained"
            color="primary"
            aria-label="contained primary button group"
          >
            <Button onClick={handlerSalvar}>Salvar</Button>
            {modo === "put" && <Button onClick={handlerApagar}>Apagar</Button>}
            <Button onClick={handlerVoltar}>Voltar</Button>
          </ButtonGroup>
        </Grid>
      </Grid>
      <Grid>
        <div className={classes.draftRoot}>
          <TextField
            required
            value={novoTitulo}
            id="titulo"
            label="Titulo"
            variant="outlined"
            fullWidth={true}
            style={{ margin: 8 }}
            onChange={event => setTitulo(event.target.value)}
          />
          <TextField
            required
            id="resumo"
            label="Resumo"
            variant="outlined"
            value={novoResumo}
            fullWidth={true}
            multiline
            rows={4}
            style={{ margin: 8 }}
            onChange={event => setResumo(event.target.value)}
          />
          <Editor
            editorState={novoConteudo}
            toolbarClassName={classes.draftToolbarCustom}
            wrapperClassName={classes.draftWrapperCustom}
            editorClassName={classes.draftEditorCustom}
            onEditorStateChange={setConteudo}
          />
        </div>
      </Grid>
    </>
  )
}

export default NovaNoticia
