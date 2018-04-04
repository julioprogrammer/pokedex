const pubsub = require('../../../pubsub');

function buildFilters({OR = [], key_contains, name_contains}) {
    const filter = (key_contains || name_contains) ? {} : null;
    if (key_contains) {
        filter.key = {$regex: `.*${key_contains}.*`};
    }
    if (name_contains) {
        filter.name = {$regex: `.*${name_contains}.*`};
    }

    let filters = filter ? [filter] : [];
    for (let i = 0; i < OR.length; i++) {
        filters = filters.concat(buildFilters(OR[i]));
    }
    return filters;
}

export const pokemonsResolvers = {

    Query: {

        allPokemons: async (root, {filter}, { mongo: { Pokemons } }) => {
            let query = filter ? {$or: buildFilters(filter)} : {};
            return await Pokemons.find(query).toArray();
        },

    },

    Mutation: {

        createPokemons: async (root, data, { mongo: { Pokemons } }) => {
            const newPokemon = {
                key: Date.now().toString(),
                name: data.name,
                image: data.image,
                description: data.description,
                color: data.color
            };
            const response = await Pokemons.insert(newPokemon);
            newPokemon._id = response.insertedIds[0];
            pubsub.publish('Pokemon', { Pokemon: { mutation: 'CREATED', node: newPokemon } });
            return newPokemon;
        },

        deletePokemons: async (root, data, { mongo: { Pokemons } }) => {
            const deletePokemon = {
                key: data.key
            }
            const response = await Pokemons.deleteOne({ key: deletePokemon.key });
            pubsub.publish('Pokemon', { Pokemon: { mutation: 'DELETED', node: deletePokemon } });
            return deletePokemon;
        }

    },

    Subscription: {

        Pokemon: {
            subscribe: () => pubsub.asyncIterator('Pokemon'),
        },

    },

};