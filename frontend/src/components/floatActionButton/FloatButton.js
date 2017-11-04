import React, { Component } from 'react'
import { Redirect } from 'react-router'

class FloatButton extends Component {
    constructor(props) {
        super(props)

        this.state = {
            redirect: false,
        }
    }

    redirect = (linkToRedirect = '/') => {
        this.setState({
            redirect: linkToRedirect,
        })
    }

    renderRows = (options = []) => {
        const rows = options.map((opt) => (
            <li key={opt.key}>
                <button onClick={() => (opt.funcOptions) ? opt.funcOptions() : this.redirect(opt.to)} 
                className={`btn-floating waves-effect waves-light ${opt.color}`}>
                    <i className='material-icons'>{opt.icon}</i>
                </button>
            </li>
        ))
        return rows
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

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