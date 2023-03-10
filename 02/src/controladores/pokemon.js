const { listarPokemons, detalharPokemon } = require("utils-playground")

async function listagemPokemons(req, res) {
    try {
        const lista = await listarPokemons();

        return res.status(200).json(lista.results);

    } catch (erro) {
        return res.status(400).json(`Erro: ${erro.message}`)
    }
}

async function obterPokemon(req, res) {
    const { idOuNome } = req.params

    try {
        const pokemon = await detalharPokemon(idOuNome);

        const objetoPokemon = {
            id: idOuNome,
            name: pokemon.name,
            height: pokemon.height,
            weight: pokemon.weight,
            base_experience: pokemon.base_experience,
            forms: pokemon.forms,
            abilities: pokemon.abilities,
            species: pokemon.species
        }

        return res.status(200).json(objetoPokemon);

    } catch (erro) {
        return res.status(400).json(`Erro: ${erro.message}`)
    }
}

module.exports = {
    listagemPokemons,
    obterPokemon,
}