import React, { useState, useContext } from "react"
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core"
import TodayIcon from "@material-ui/icons/Today"
import GroupIcon from "@material-ui/icons/Group"
import AnnouncementIcon from "@material-ui/icons/Announcement"
import DescriptionIcon from "@material-ui/icons/Description"
import { Link } from "react-router-dom"
import UserContext from "../../contexts/User/UserContext"

const style = {
  fill: "white",
}

export default function MenuList() {
  const { groups } = useContext(UserContext)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index)
  }

  return (
    <div>
      <ListItem
        button
        component={Link}
        to="/"
        selected={selectedIndex === 0}
        onClick={event => handleListItemClick(event, 0)}
      >
        <ListItemIcon>
          <TodayIcon style={style} />
        </ListItemIcon>
        <ListItemText primary="Eventos" />
      </ListItem>
      <ListItem
        button
        component={Link}
        to="conteudos"
        selected={selectedIndex === 1}
        onClick={event => handleListItemClick(event, 1)}
      >
        <ListItemIcon>
          <DescriptionIcon style={style} />
        </ListItemIcon>
        <ListItemText primary="Conteúdos" />
      </ListItem>
      {groups.includes("diretoria") && (
        <>
          <Divider />
          <ListItem
            button
            component={Link}
            to="noticias"
            selected={selectedIndex === 2}
            onClick={event => handleListItemClick(event, 2)}
          >
            <ListItemIcon>
              <AnnouncementIcon style={style} />
            </ListItemIcon>
            <ListItemText primary="Noticias" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="usuarios"
            selected={selectedIndex === 3}
            onClick={event => handleListItemClick(event, 3)}
          >
            <ListItemIcon>
              <GroupIcon style={style} />
            </ListItemIcon>
            <ListItemText primary="Usuários" />
          </ListItem>
        </>
      )}
    </div>
  )
}
