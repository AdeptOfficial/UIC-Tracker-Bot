/**
 * @author Leland 'AdepT' Moy
 * @license AdeptProduction
 * @file ready.js
 * @info readys the bot, handles connections with database
 */


require('module-alias/register')
module.exports = (client, Discord, message) => {
    // basic login prompt
    console.log(`Logged in as ${client.user.tag}!`);

    // const declarations
    const config = require("@root/config.js");
    const mongoose = require('mongoose')
    const express = require("express");
    const { CommandoClient } = require('discord.js-commando');
    const app = express();
    const port = 4000;

    // express and connect to mongodb setup
    app.listen(port, async function() {
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
    const MongoClient = require('mongodb').MongoClient;
    const MongoDBProvider = require('commando-provider-mongo').MongoDBProvider;
    client.setProvider(
        MongoClient.connect(config.mongoPath, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
            .then(client => {
                console.log ('Commando to Mongo connected')
                return new MongoDBProvider(client, 'Tracker')
            }).catch((err) => {
                console.error(err)
            })
    )


    client.on('message', function(msg) {
        if(msg.content.startsWith('thanks') || msg.content.startsWith('thx') || msg.content.startsWith('thnks') || msg.content.startsWith('ty')) {
            msg.reply('Consider thanking the person by using !thank @user :D')
        }
    })
}