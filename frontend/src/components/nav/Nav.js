import React from 'react'

const Nav = (props) => {
    const classNav = props.color || 'grey lighten-4'
    return (
        <nav className={classNav} role='navigation'>
            <div className='nav-wrapper container'>
                <div className={`row ${!props.search ? 'hide' : ''}`} id='search'>
                    <form className='col s12'>
                        <div className='row'>
                            <div className='input-field col s12 grey-text text-darken-4'>
                                <i className='material-icons prefix'>search</i>
                                <input
                                    id='icon_prefix'
                                    type='text'
                                    className='validate'
                                    placeholder='Search'
                                    name='search'
                                    onChange={props.onChangeSearch}
                                />
                            </div>
                        </div>
                    </form>
                </div>
                <div className={`${props.search ? 'hide' : ''}`}>
                    <a id='logo-container' className='brand-logo grey-text text-darken-4'>Pokedéx</a>
                    <ul className='right hide-on-med-and-down'>
                        <li>
                          <a className='dropdown-button grey-text text-darken-4' data-activates='dropdownCadastros'>
                            Cadastros
                            <i className='material-icons right'>arrow_drop_down</i>
                          </a>
                        </li>
                    </ul>
                    <ul id='nav-mobile' className='side-nav'>
                        <li><a href='cadastrar.html'>Cadastrar</a></li>
                    </ul>
                    <a data-activates='nav-mobile' className='button-collapse'><i className='material-icons grey-text text-darken-4'>menu</i></a>
                </div>
            </div>
        </nav>
    )
}

export default Nav
