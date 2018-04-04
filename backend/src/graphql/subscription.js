import { pokemonsSubscriptions } from './resources/pokemons/pokemons.schema';

const Subscription = `
    type Subscription {
        ${pokemonsSubscriptions}
    }
`;

export {
    Subscription,
}