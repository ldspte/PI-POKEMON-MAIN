const { Router } = require('express');
const {getAllInfo, getPokemonById, getPokemonByName, postPokemon} = require('../controllers/index');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/', (req, res) => {
    try {
        const allPokemons = getAllInfo();
        if (allPokemons.error) throw Error(allPokemons.error);
        return res.status(200).json(allPokemons)

    } catch (error) {
        return res.status(404).send(error.message);
    }
})

router.get('/', (req, res) => {
    try {
        const {name} = req.query;
        const pokemonName = getPokemonByName(name);
        if (pokemonName.error) throw Error(pokemonName.error);
        return res.status(200).json(pokemonName);
    } catch (error) {
        return res.status(404).send(error.message);
    }
})

router.get('/:idPokemon', (req, res) => {
    try {
        const {idPokemon} = req.params;
        const pokemonId = getPokemonById(idPokemon);
        if(pokemonId.error) throw Error(pokemonId.error);
        return res.status(200).json(pokemonId);
    } catch (error) {
        return res.status(404).send(error.message);
    }
});

router.post('/', (req, res) => {
    try {
        const {name, image, life, attack, defense, weight, height} = req.body;
        if (!name || !image || !life || !attack || !defense || !weight || !height) throw Error ('Debes llenar todos los campos');
        const newPokemon = postPokemon(name, image, life, attack, defense, weight, height)
        return res.status(200).json(newPokemon);
    } catch (error) {
        return res.status(404).send(error.message);
        
    }
})





module.exports = router;
