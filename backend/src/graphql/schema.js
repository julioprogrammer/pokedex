import { makeExecutableSchema } from 'graphql-tools';
import { merge } from 'lodash';

import { Query } from './query';
import { Mutation } from './mutation';
import { Subscription } from './subscription';

import { pokemonsTypes } from './resources/pokemons/pokemons.schema';

import { pokemonsResolvers } from './resources/pokemons/pokemons.resolvers';

const resolvers = merge(
    pokemonsResolvers,
);

const SchemaDefinition = `
    type Schema {
        query: Query
        mutation: Mutation
        subscription: Subscription
    }
`;

export default makeExecutableSchema({
    typeDefs: [
        SchemaDefinition,
        Query,
        Mutation,
        Subscription,
        pokemonsTypes,
    ],
    resolvers
});