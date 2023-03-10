const { buscarEndereco } = require("utils-playground");
const fs = require("fs/promises");

async function obterEndereco(req, res) {
    const { cep } = req.params;

    if (isNaN(cep)) {
        return res.status(400).json({ mensagem: "O CEP informado deve ser um número válido." })
    }

    if (cep.length !== 8) {
        return res.status(400).json({ mensagem: "O CEP informado deve ter no máximo 8 digitos." })
    }

    const cepFormatado = `${cep.slice(0, 5)}-${cep.slice(5)}`;

    try {
        const enderecos = await fs.readFile("./src/enderecos.json");

        const arrayEnderecos = JSON.parse(enderecos);

        let endereco = arrayEnderecos.find(endereco => endereco.cep === cepFormatado);

        if (!endereco) {
            endereco = await buscarEndereco(cep);

            if (!endereco) {
                return res.status(404).json({ mensagem: "Não existe nenhum endereço para o CEP informado." });
            }
            arrayEnderecos.push(endereco);

            await fs.writeFile("./src/enderecos.json", JSON.stringify(arrayEnderecos))

            return res.status(200).json(endereco);
        }

        return res.status(200).json(endereco);

    } catch (erro) {
        return res.status(400).json(`Erro: ${erro.message}`);
    }
}

module.exports = {
    obterEndereco
}