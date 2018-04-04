import { pokemonsMutations } from './resources/pokemons/pokemons.schema';

const Mutation = `
    type Mutation {
        ${pokemonsMutations}
    }
`;

export {
    Mutation,
}