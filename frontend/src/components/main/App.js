import React, { Component } from 'react'
import Routes from '../../routes'
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'
import '../../style/cards.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Routes />
      </div>
    );
  }
}

export default App
