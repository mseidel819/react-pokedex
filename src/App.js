import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import AppNavigator from "./components/AppNavigator.js";
import Pokedex from "./containers/pokedex.js";
import PokemonDetails from "./containers/PokemonDetails.js";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import Favorites from "./containers/Favorites.js";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <AppNavigator />
          <Route exact path="/" component={Pokedex} />
          <Route exact path="/pokemon/:id" component={PokemonDetails} />
          <Route exact path="/favorites" component={Favorites} />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}
