import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  cardMedia: {
    margin: "auto",
    width: "130px",
    height: "130px",
  },
  card: {
    cursor: "pointer",
    backgroundColor: "black",
    color: "white",
    "&:hover": {
      backgroundColor: "rgb(90,90,90)",
    },
  },
  cardContent: {
    textAlign: "center",
  },
  link: {
    textDecoration: "none",
  },
}));

const PokemonCard = (props) => {
  const classes = useStyles();
  const { pokemon, image } = props;
  const { id, name } = pokemon;
  return (
    <Grid item m={12} key={id}>
      <Link to={"/pokemon/" + id} className={classes.link}>
        <Card className={classes.card}>
          <CardMedia className={classes.cardMedia} image={image}></CardMedia>
          <CardContent className={classes.cardContent}>
            <Typography>{name}</Typography>
          </CardContent>
        </Card>
      </Link>
    </Grid>
  );
};

export default PokemonCard;
