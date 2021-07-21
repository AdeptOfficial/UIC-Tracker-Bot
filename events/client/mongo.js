const mongoose = require('mongoose')
const express = require("express");
const {
    CommandoClient
} = require('discord.js-commando');
const app = express();
const port = 4000;
const MongoClient = require('mongodb').MongoClient;
const MongoDBProvider = require('commando-provider-mongo').MongoDBProvider;

module.exports = (client) => {
    const config = require("@root/config.js");

    // express and connect to mongodb setup
    app.listen(port, async function () {
        console.log("Server is running on Port: " + port);
        // load mongo
        mongoose.connect(config.mongoPath, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false,
            })
            .then(x => console.log(`Connected to Database! Database name: "${x.connections[0].name}"`))
            .catch(err => console.error('Error connecting to mongo', err));
    });

    //commando to mongo server setup
    client.setProvider(
        MongoClient.connect(config.mongoPath, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(client => {
            console.log('Commando to Mongo connected')
            return new MongoDBProvider(client, 'Tracker')
        })
        .catch((err) => {
            console.error('Commando unable to connect to Mongo', err)
        })
    )

}