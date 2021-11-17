import React, { useEffect, useState } from "react";
import axios from "axios";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import styled from "styled-components";
import {
  Icon,
  IconButton,
  ListItemButton,
  ListItemSecondaryAction,
} from "@mui/material";
import Palette from "../Themes/Palette";

const GreenStatus = styled.span`
  color: green;
`;

const RedStatus = styled.span`
  color: red;
`;

export default function EstablishmentsList() {
  const [establishments, setEstablishments] = useState([]);
  const [statusColors, setStatusColors] = useState([]);
  const [icon, setIcon] = useState([]);

  const toggleStatusColor = (status) => {
    return status.toLowerCase() === "aberto" ? (
      <GreenStatus>{status}</GreenStatus>
    ) : (
      <RedStatus>{status}</RedStatus>
    );
  };

  const toggleFavIcon = (favIcon) => {
    return favIcon === "favorite_border" ? "favorite" : "favorite_border";
  };

  const updateFavIcon = (index, favIcon) => {
    let icons = [...icon];
    icons[index] = toggleFavIcon(favIcon);
    setIcon(icons);
  };

  useEffect(() => {
    axios
      .get("./establishments.json")
      .then((establishments) => {
        setEstablishments(establishments.data);
        return establishments.data;
      })
      .then((establishments) => {
        setStatusColors(
          establishments.map((establishment) =>
            toggleStatusColor(establishment.status)
          )
        );
        setIcon(establishments.map(() => "favorite_border"));
      });
  }, []);

  return (
    <Palette>
      <List>
        <ListSubheader sx={{ fontWeight: "bold", color: "#000000" }}>
          Estabelecimentos
        </ListSubheader>
        {establishments.map((establishment, index) => (
          <ListItemButton key={index}>
            <ListItemAvatar>
              <Avatar alt={establishment.name} src={establishment.image} />
            </ListItemAvatar>
            <ListItemText
              primary={establishment.name}
              primaryTypographyProps={{ variant: "subtitle1" }}
              secondary={statusColors[index]}
            />
            <ListItemSecondaryAction>
              <IconButton
                color="primary"
                onClick={(event) =>
                  updateFavIcon(index, event.target.firstChild.nodeValue)
                }
              >
                <Icon>{icon[index]}</Icon>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItemButton>
        ))}
      </List>
    </Palette>
  );
}
