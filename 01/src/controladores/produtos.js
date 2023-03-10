const produtos = require("../bancodedados/produtos")
const { getStateFromZipcode } = require("utils-playground")

async function listarProdutos(req, res) {
    return res.status(200).json(produtos);
}

async function obterProduto(req, res) {
    const { idProduto } = req.params;

    if (isNaN(idProduto)) {
        return res.status(400).json({ mensagem: "O id informado deve ser um número válido." })
    }

    const produto = produtos.find(produto => produto.id === Number(idProduto))

    if (!produto) {
        return res.status(404).json({ mensagem: "Produto não encontrado." })
    }

    return res.status(200).json(produto);
}

async function calcularFreteProduto(req, res) {
    const { idProduto, cep } = req.params;

    if (isNaN(idProduto)) {
        return res.status(400).json({ mensagem: "O id informado deve ser um número válido." })
    }

    if (isNaN(cep)) {
        return res.status(400).json({ mensagem: "O id informado deve ser um número válido." })
    }

    const produto = produtos.find(produto => produto.id === Number(idProduto))

    if (!produto) {
        return res.status(404).json({ mensagem: "Produto não encontrado." })
    }

    try {
        let uf = await getStateFromZipcode(cep);
        let frete;

        if (uf === "SP" || uf === "RJ") {
            frete = 0.15 * produto.valor;
        } else if (uf === "BA" || uf === "SE" || uf === "AL" || uf === "PE" || uf === "PB") {
            frete = 0.1 * produto.valor;
        } else {
            frete = 0.12 * produto.valor;
        }

        const produtoComFrete = {
            produto,
            estado: uf,
            frete
        }
        return res.status(200).json(produtoComFrete);

    } catch (erro) {
        return res.status(400).json(`Erro: ${erro.message}`)
    }
}

module.exports = {
    listarProdutos,
    obterProduto,
    calcularFreteProduto,
}