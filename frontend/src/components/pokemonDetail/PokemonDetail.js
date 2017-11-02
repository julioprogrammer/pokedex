import React, { Component } from 'react'
import { graphql, gql } from 'react-apollo'

import CardDetail from '../cards/CardDetail'
import Nav from '../nav/Nav'
import DropdownList from '../nav/DropdownList'
import FloatButton from '../floatActionButton/FloatButton'

import { mockCards } from '../../util'

class PokemonDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            options: [
                {
                    key: 'deletePokemon',
                    icon: 'delete',
                    color: 'red',
                    to: ''
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

    componentWillMount() {
        const pokemonSelected = mockCards.filter((data) => data.key === this.props.match.params.id)
        this.setState({
            detail: pokemonSelected[0] || this.state.detail
        })
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

    render() {
        const pokemon = this.renderComponent()

        return(
            <div>
                <DropdownList />
                <Nav color={pokemon.color} />
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
                    mainColor={'orange darken-4'}
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
export default graphql(DETAIL_POKEMON_QUERY, { name: 'detailPokemonQuery' }) (PokemonDetail)
