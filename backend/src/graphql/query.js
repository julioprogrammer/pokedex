import { pokemonsQueries } from './resources/pokemons/pokemons.schema';

const Query = `
    type Query {
        ${pokemonsQueries}
    }
`;

export {
    Query,
}