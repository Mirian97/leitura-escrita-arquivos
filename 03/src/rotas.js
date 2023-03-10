const express = require("express");
const { obterEndereco } = require("./controladores/enderecos");

const rotas = express();

rotas.get("/enderecos/:cep", obterEndereco)

module.exports = rotas;