/**
 * @author Leland 'AdepT' Moy
 * @license AdeptProduction
 * @file index.js
 * @info main code for UIC Tracker Bot
 */

// basic setup
const path = require('path')
const config = require("./config.js");
const Commando = require('discord.js-commando')
const mongoose = require('mongoose')
const client = new Commando.CommandoClient({
    owner: config.ownerToken,
    commandPrefix: config.prefix,
    fetchAllMembers: true
})


// inactive handlers
//const cmdHandler = require('./cmdhandler.js');
const channelHandler = require('./channelhandler.js')
//const eventHandler = require('./eventHandler.js')

// express and connect to mongodb setup
const express = require("express");
const app = express();
const port = 4000;
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


// discord client start up prompt
client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);

    // load channel settings
    channelHandler(client)
    // load commando settings and cmds
    client.registry
    .registerGroups([
        ['misc', 'misc commands'],
        ['moderation', 'moderation commands'],
        ['users', 'common user commands'],
        ['thanks', 'commands to help thank people'],
    ])
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname, 'commando-cmds'))
})

client.on('message', (msg) => {
    if(msg.content.startsWith('thanks') || msg.content.startsWith('thx') || msg.content.startsWith('thnks') || msg.content.startsWith('ty')) {
        msg.reply('Consider thanking the person by using !thank @user :D');
    }
})
// bot login
client.login(config.token);