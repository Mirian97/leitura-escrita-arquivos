const express = require("express");
const produtos = require("./controladores/produtos.js")

const rotas = express();

rotas.get("/produtos", produtos.listarProdutos);
rotas.get("/produtos/:idProduto", produtos.obterProduto);
rotas.get("/produtos/:idProduto/frete/:cep", produtos.calcularFreteProduto)

module.exports = rotas;