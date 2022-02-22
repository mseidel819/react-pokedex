import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  AppBar: {
    backgroundColor: "black",
  },
  link: {
    textDecoration: "none",
  },
  title: {
    cursor: "pointer",
    color: "white",
  },
}));

export default function AppNavigator(props) {
  const classes = useStyles();
  return (
    <AppBar className={classes.AppBar} position="fixed">
      <Toolbar>
        <Link to="/" className={classes.link}>
          <Typography variant="h6" className={classes.title}>
            Pokedex
          </Typography>
        </Link>
        <Link to="/favorites" className={classes.link}>
          <Typography
            style={{ marginLeft: 15 }}
            variant="h6"
            className={classes.title}
          >
            Favorites
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
