import React, { Component } from 'react'
import '../../style/cards.css'

class Cards extends Component {
    render() {
        return (
            <div className="col s12 m6">
                <div className="card">
                    <div className="card-image">
                        <img src={this.props.image} alt='Imagem do pokemon' />
                        <span className="card-title grey darken-4">{this.props.name}</span>
                        <a href={`/detail/${this.props.id}`} className='btn-floating halfway-fab waves-effect waves-light red'><i className="material-icons">add</i></a>
                    </div>
                    <div className="card-content">
                        <p>Clicke no "mais ( + )" para ver os detalhes desse pokemon</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Cards
