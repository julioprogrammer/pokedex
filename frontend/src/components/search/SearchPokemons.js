import React, { Component } from 'react'
import { withApollo, gql } from 'react-apollo'

import Nav from '../nav/Nav'
import Cards from '../cards/Cards'

class SearchPokemons extends Component {
    state = {
        pokemons: []
    }

    onChangeSearch = async (ev) => {
        if (ev.target.value) {
            const searchData = await this.props.client.query({
                query: QUERY_FILTER_SEARCH,
                variables: {
                    name: ev.target.value.toUpperCase()[0]
                }
            })
            this.setState({
                pokemons: searchData.data.allPokemons
            })
        } else {
            this.setState({
                pokemons: []
            })
        }
    }

    render() {
        return (
            <div>
                <Nav search={true} onChangeSearch={this.onChangeSearch} />
                <div className="container">
                    <div className="section">
                        <div className="row">
                            {this.state.pokemons.map((pokemon) => (
                                <Cards key={pokemon.key} id={pokemon.key} name={pokemon.name} image={pokemon.image}
                                       description={pokemon.description}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const QUERY_FILTER_SEARCH = gql`
    query allPokemonsQuery($name: String!) {
        allPokemons(
            filter: {
                name_contains: $name
            }
        ) {
            key,
            name,
            description,
            image,
            color
        }
    }
`

export default withApollo(SearchPokemons)
