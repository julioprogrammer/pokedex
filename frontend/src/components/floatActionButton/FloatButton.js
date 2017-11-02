import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class FloatButton extends Component {

    renderRows = (options = []) => {
        const rows = options.map((opt) => (
            <li key={opt.key}>
                <Link to={opt.to || ''} className={`btn-floating waves-effect waves-light ${opt.color}`}>
                    <i className='material-icons'>{opt.icon}</i>
                </Link>
            </li>
        ))
        return rows
    }

    render() {
        return(
            <div className={`fixed-action-btn ${this.props.orientation}`}>
                <a className={`btn-floating btn-large ${this.props.mainColor}`}>
                    <i className='large material-icons'>{this.props.mainIcon}</i>
                </a>
                <ul>
                    { this.renderRows(this.props.options) }
                </ul>
            </div>
        )
    }
}

export default FloatButton