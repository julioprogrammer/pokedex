import React, { Component } from 'react'

import '../../style/cards.css'
import $ from 'jquery'

class CardDetail extends Component {

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.typeColor !== this.props.typeColor) {
            $('body').addClass(`${this.props.typeColor} lighten-4`)
        }
    }

    render () {
        return (
            <div className='col offset-m3 s12 m6'>
                <div className='card'>
                    <div className='card-image'>
                        <img className='materialboxed' width='650' src={this.props.image} alt='Imagem do pokemon' />
                    </div>
                    <div className={`card-content ${this.props.typeColor} lighten-1`}>
                        <p>{this.props.description}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default CardDetail
