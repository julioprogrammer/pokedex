import React, { Component } from 'react'
import { graphql, gql, compose } from 'react-apollo'

import CardDetail from '../cards/CardDetail'
import Nav from '../nav/NavDetail'
import DropdownList from '../nav/DropdownList'
import FloatButton from '../floatActionButton/FloatButton'

import $ from 'jquery'

class PokemonDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            options: [
                {
                    key: 'deletePokemon',
                    icon: 'delete',
                    color: 'red',
                    to: '',
                    funcOptions: this.deletePokemons
                },
                {
                    key: 'editPokemon',
                    icon: 'edit',
                    color: 'blue',
                    to: ''
                }
            ]
        }
    }

    renderComponent = () => {
        if (this.props.detailPokemonQuery && this.props.detailPokemonQuery.loading) {
            return (
                <div class="progress">
                    <div class="indeterminate"></div>
                </div>
            )
        }

        if (this.props.detailPokemonQuery && this.props.detailPokemonQuery.error) {
            return <div>Error !!!</div>
        }

        return this.props.detailPokemonQuery.allPokemons.filter((data) => data.key === this.props.match.params.id)[0]
    }

    deletePokemons = () => {
        this.props.deletePokemonsMutation({
            variables: {
               key: this.props.match.params.id
            },
            update: (store, { data: { deletePokemons } }) => {
                $('body').removeAttr(`class`)
                const data = store.readQuery({ query: DETAIL_POKEMON_QUERY })
                const allPokemons = data.allPokemons.filter((dt) => dt.key !== this.props.match.params.id)
                store.writeQuery({
                    query: DETAIL_POKEMON_QUERY,
                    data: { allPokemons: [...allPokemons] }
                })
            }
        })
        this.props.history.push(`/`)
    }

    render() {
        const pokemon = this.renderComponent()

        return(
            <div>
                <DropdownList />
                <Nav color={pokemon.color} pokemonName={pokemon.name}/>
                <div className="container">
                    <div className="section">
                        <div className="row">
                            <CardDetail
                                name={pokemon.name}
                                image={pokemon.image}
                                description={pokemon.description}
                                typeColor={pokemon.color} />
                        </div>
                    </div>
                </div>
                <FloatButton
                    options={this.state.options}
                    mainIcon={'content_paste'}
                    mainColor={'red'}
                    orientation={'vertical'} />
            </div>
        )
    }
}

const DETAIL_POKEMON_QUERY = gql`
    query detailPokemonQuery {
        allPokemons {
            key,
            name,
            description,
            image,
            color
        }
    }
`

const DELETE_POKEMONS = gql`
    mutation deletePokemonsMutation($key: String!) {
        deletePokemons(
            key: $key
        ) {
            key
        }
    }
`
export default compose(
    graphql(DETAIL_POKEMON_QUERY, { name: 'detailPokemonQuery' }),
    graphql(DELETE_POKEMONS, { name: 'deletePokemonsMutation' })   
) (PokemonDetail)
