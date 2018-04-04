const pokemonsTypes = `

    # Pokemons definition type
    type Pokemon {
        _id: ID!
        key: String!
        name: String!
        image: String!
        description: String!
        color: String!
    }

    type PokemonSubscriptionPayload {
        mutation: _ModelMutationType!
        node: Pokemon
    }

    input PokemonSubscriptionFilter {
        mutation_in: [_ModelMutationType!]
    }

    input PokemonFilter {
        OR: [PokemonFilter!]
        key_contains: String
        name_contains: String
    }

    enum _ModelMutationType {
        CREATED
        UPDATED
        DELETED
    }

`;

const pokemonsQueries = `
    allPokemons(filter: PokemonFilter): [Pokemon!]!
`;

const pokemonsMutations = `
    createPokemons(image: String!, name: String!, description: String!, color: String!): Pokemon
    deletePokemons(key: String!): Pokemon
`;

const pokemonsSubscriptions = `
    Pokemon(filter: PokemonSubscriptionFilter): PokemonSubscriptionPayload
`;

export {
    pokemonsTypes,
    pokemonsQueries,
    pokemonsMutations,
    pokemonsSubscriptions
}