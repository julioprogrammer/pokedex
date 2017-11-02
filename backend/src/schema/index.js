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
        deletePokemons(_id: String!): Pokemon
    }

    input PokemonFilter {
      OR: [PokemonFilter!]
      key_contains: String
      name_contains: String
    }
`;

module.exports = makeExecutableSchema({ typeDefs, resolvers });
