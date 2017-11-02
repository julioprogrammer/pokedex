const { MongoClient } = require('mongodb');

const MONGO_URL = 'mongodb://localhost:27017/pokedex';

module.exports = async () => {
    const db = await MongoClient.connect(MONGO_URL);

    return {
        Pokemons: db.collection('pokemons')
    };
}
