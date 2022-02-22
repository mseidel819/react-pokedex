import {
  Box,
  CircularProgress,
  Typography,
  withStyles,
  Grid,
  Button,
} from "@material-ui/core";
import Favorite from "@material-ui/icons/Favorite";

// import { withStyles } from "@mui/styles";

import axios from "axios";
import React, { Component } from "react";
import { ReactReduxContext } from "react-redux";
import { POKEMON_API_URL } from "../config";
import { connect } from "react-redux";
import { toggleFavorite } from "../redux/actions";

const styles = (theme) => ({
  pokedexContainer: {
    height: "84vh",
    backgroundColor: "black",
    color: "white",
    marginTop: "75px",
    textAlign: "center",
    borderRadius: 5,
    paddingTop: 30,
  },
  textTitle: {
    textTransform: "upperCase",
    fontFamily: "Fantasy",
  },
  pokemonImage: {
    widght: "170px",
    height: "170px",
  },
  pokemonInfoContainer: {
    bottom: 60,
    position: "absolute",
  },
  seperator: {
    height: "0.001px",
    width: "95%",
  },
  favorite: {
    height: 50,
    width: 50,
    marginTop: 15,
  },
  text: {
    fontSize: "30px",
  },
});

class PokemonDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: null,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { id } = match?.params;
    axios.get(`${POKEMON_API_URL}/${id}`).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        // console.log(response.data);
        this.setState({
          pokemon: response.data,
        });
      }
    });
  }

  favoriteChecker(pokemon) {
    let found = false;
    this.props.favorites?.map((p) => {
      if (p.id === pokemon.id) {
        found = true;
      }
    });
    return found;
  }

  render() {
    // console.log(this.props.favorites);
    const { classes } = this.props;
    const { pokemon } = this.state;

    // console.log(pokemon);
    if (pokemon) {
      const { name, sprites, height, weight, types } = pokemon;
      console.log(pokemon);
      return (
        <Box>
          <Box className={classes.pokedexContainer}>
            <Typography className={classes.textTitle} variant="h1">
              {name}
            </Typography>
            <img src={sprites.front_default} className={classes.pokemonImage} />
            <Box className={classes.pokemonInfoContainer}></Box>
            <hr className={classes.seperator} />
            <Grid container>
              <Grid item md={1}>
                <Button
                  onClick={() => {
                    this.props.toggleFavorite(pokemon);
                  }}
                  className={classes.favorite}
                >
                  <Favorite
                    style={{
                      color: this.favoriteChecker(pokemon) ? "red" : "white",
                      fontSize: 45,
                    }}
                  />
                </Button>
              </Grid>

              <Grid item sm={2}>
                <Typography className={classes.text}>
                  Name
                  <br />
                  {name}
                </Typography>
              </Grid>

              <Grid item sm={2}>
                <Typography className={classes.text}>
                  Height
                  <br />
                  {height}m
                </Typography>
              </Grid>

              <Grid item sm={2}>
                <Typography className={classes.text}>
                  Weight
                  <br />
                  {weight}kg
                </Typography>
              </Grid>

              {types.map((pokemonType) => {
                const { name } = pokemonType.type;
                return (
                  <Grid item sm={2}>
                    <Typography className={classes.text}>
                      Type
                      <br />
                      {name}
                    </Typography>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Box>
      );
    } else {
      return <CircularProgress />;
    }
  }
}

const mapStateToProps = (state) => ({
  favorites: state.favorites,
});

const mapDispatchToProps = (dispatch) => ({
  toggleFavorite: (pokemon) => dispatch(toggleFavorite(pokemon)),
});
export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(PokemonDetails)
);
