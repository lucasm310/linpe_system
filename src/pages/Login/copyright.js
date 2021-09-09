import React from "react"
import { Typography, Link } from "@material-ui/core"

export default function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Desenvolvido por: "}
      <Link
        color="inherit"
        href="https://www.linkedin.com/in/lucas-augusto-de-morais-6156413b/"
      >
        Lucas Augusto de Morais
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}
