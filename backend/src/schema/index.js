const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');

const typeDefs = `
    type Pokemon {
        _id: ID!
        key: String!
        name: String!
        image: String!
        description: String!
        color: String!
    }

    type Query {
        allPokemons(filter: PokemonFilter): [Pokemon!]!
    }

    type Mutation {
        createPokemons(image: String!, name: String!, description: String!, color: String!): Pokemon
        deletePokemons(key: String!): Pokemon
    }

    type Subscription {
        Pokemon(filter: PokemonSubscriptionFilter): PokemonSubscriptionPayload
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

module.exports = makeExecutableSchema({ typeDefs, resolvers });
