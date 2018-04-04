import React, { Component } from 'react'
import { graphql, gql } from 'react-apollo'

import Nav from '../nav/Nav'
import Dropdown from '../nav/DropdownList'

import { ALL_POKEMONS_QUERY } from '../cards/CardList'

class NewPokemons extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            image: '',
            description: '',
            color: '',
            colorsPalette: [
                'red',
                'purple',
                'indigo',
                'blue',
                'teal',
                'green',
                'yellow',
                'grey',
            ],
        }
    }

    onSaveNewPokemon = async () => {
        const { name, image, description, color, colorsPalette } = this.state
        const colorSelected = (color) ? color : colorsPalette[Math.floor((Math.random() * 8) + 1)]

        await this.props.createPokemonMutation(
            { 
                variables: { 
                    image, 
                    name, 
                    description, 
                    color: colorSelected
                },
                update: (store, { data: { createPokemons } }) => {
                    const data = store.readQuery({ query: ALL_POKEMONS_QUERY })
                    store.writeQuery({
                        query: ALL_POKEMONS_QUERY,
                        data
                    })
                } 
            }
        )

        this.props.history.push(`/`)
    }

    onChangeInputs = (e) => {
        this.setState({
            [e.target.name]: e.target.value    
        })
    }

    setSelectColor = (event) => {
        this.setState({
            color: event.target.name
        })
    }

    renderButtonsColor = () => {
        const { colorsPalette } = this.state

        const buttonsToRender = colorsPalette.map((data) => {
            return (
                <div className='buttonColors' key={data}>
                    <button type='button' className={`waves-effect waves-light btn-large ${data}`} name={data} onClick={(event) => this.setSelectColor(event)}>
                        {data}
                    </button>
                </div>
            )
        })

        return buttonsToRender
    }

    render() {
        return (
            <div>
                <Dropdown />
                <Nav />
                <div className='container'>
                    <div className='section'>
                        <div className='row'>
                            <form className='col s12'>
                                <div className='row'>
                                    <div className='input-field col s6'>
                                        <i className='material-icons prefix'>account_circle</i>
                                        <input id='icon_prefix' type="text" className='validate' name='name' onChange={this.onChangeInputs} />
                                        <label htmlFor="icon_prefix">Nome</label>
                                    </div>
                                    <div className='input-field col s6'>
                                        <i className='material-icons prefix'>image</i>
                                        <input id="icon_prefix" type="text" className='validate' name='image' onChange={this.onChangeInputs} />
                                        <label htmlFor="icon_prefix">Imagem</label>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='input-field col s6'>
                                        <i className='material-icons prefix'>mode_edit</i>
                                        <textarea id="icon_prefix2" className='materialize-textarea' name='description' onChange={this.onChangeInputs}></textarea>
                                        <label htmlFor="icon_prefix2">Descrição</label>
                                    </div>
                                    <div className='col s6'>
                                        <img className='imagePreview' src={this.state.image} alt='Pokemon Image' />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col s12'>
                                        { this.renderButtonsColor() }
                                    </div>
                                </div>
                                <a className='waves-effect waves-light btn' onClick={this.onSaveNewPokemon}><i className='material-icons right'>save</i>Salvar</a>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const CREATE_POKEMON_MUTATION = gql`
    mutation createPokemonMutation($image: String!, $name: String!, $description: String!, $color: String!) {
        createPokemons(
            image: $image, 
            name: $name, 
            description: $description, 
            color: $color
        ) {
            key,
            name,
            image,
            description,
            color
        }
    }
`

export default graphql(CREATE_POKEMON_MUTATION, { name: 'createPokemonMutation' }) (NewPokemons)
