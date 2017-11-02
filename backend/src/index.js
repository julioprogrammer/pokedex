const express = require('express');
const bodyParser = require('body-parser');
const {
    graphqlExpress,
    graphiqlExpress
} = require('apollo-server-express');
const schema = require('./schema');
const {
    createServer
} = require('http');
const cors = require('cors');

const connectMongo = require('./mongo-connector');

const PORT = 3003;

const start = async() => {

    const mongo = await connectMongo();
    var app = express();
    const buildOptions = async(req, res) => {
        return {
            context: {
                mongo
            },
            schema,
        };
    };

    app.use('/graphql', cors(), bodyParser.json(), graphqlExpress(buildOptions));
    app.use('/graphiql', graphiqlExpress({
        endpointURL: '/graphql',
    }));

    const server = createServer(app);
    server.listen(PORT, () => {
        console.log(`Pokedéx GraphQL server running on port ${PORT}.`)
    });

};

start();
