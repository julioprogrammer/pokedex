import React from 'react'
import { Switch, Route } from 'react-router-dom'
import CardList from './components/cards/CardList'
import PokemonDetail from './components/pokemonDetail/PokemonDetail'
import NewPokemons from './components/newPokemons/NewPokemons'

export default () => (
    <Switch>
        <Route exact path='/' component={CardList} />
        <Route exact path='/detail/:id' component={PokemonDetail} />
        <Route exact path='/new' component={NewPokemons} />
    </Switch>
)
