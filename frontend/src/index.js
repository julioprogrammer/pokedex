import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/main/App'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider, createNetworkInterface, ApolloClient } from 'react-apollo'

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:3003/graphql'
})

const client = new ApolloClient({
  networkInterface
})

ReactDOM.render(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>,
    document.getElementById('root')
)
registerServiceWorker()
