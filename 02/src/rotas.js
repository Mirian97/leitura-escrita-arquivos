const express = require("express");
const pokemon = require("./controladores/pokemon")

const rotas = express();

rotas.get("/pokemon", pokemon.listagemPokemons);
rotas.get("/pokemon/:idOuNome", pokemon.obterPokemon);

module.exports = rotas