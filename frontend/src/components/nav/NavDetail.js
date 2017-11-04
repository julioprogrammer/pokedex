import React, { Component } from 'react'
import { Redirect } from 'react-router'
import $ from 'jquery'

class NavDetail extends Component {
    constructor(props) {
        super(props)

        this.state = {
            redirect: false,
        }
    }

    redirect = (redirect) => {
        this.setState({
            redirect,
        })
    }

    render() {
        if (this.state.redirect) {
            $('body').removeAttr(`class`)
            return <Redirect to={this.state.redirect} />
        }

        const classNav = this.props.color || 'grey lighten-4'
        return(
            <nav className={`nav-extended ${classNav}`}>
                <div className="nav-wrapper">
                    <a href="#!" className="brand-logo center">Pokedéx</a>
                    <ul className="right hide-on-med-and-down">
                        <li><a onClick={() => this.redirect('/new')}>Cadastrar Pokemons</a></li>
                    </ul>
                </div>
                <div className="nav-content">
                    <span className="nav-title">{this.props.pokemonName}</span>
                    <a className="btn-floating btn-large halfway-fab waves-effect waves-light red z-depth-4" onClick={() => this.redirect('/')}>
                        <i className="material-icons">chevron_left</i>
                    </a>
                </div>
            </nav>
        )
    }
}

export default NavDetail