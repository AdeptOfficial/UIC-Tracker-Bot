/**
 * @author Leland 'AdepT' Moy
 * @license AdeptProduction
 * @file index.js
 * @info main code for UIC Tracker Bot
 */

// basic setup
const Discord = require("discord.js");
//const client = new Discord.Client();
const client = new Discord.Client(
    {fetchAllMembers: true}
);
const config = require("./config.js");
const mongo = require('./mongo.js')



// handlers
const cmdHandler = require('./cmdhandler.js');
const channelHandler = require('./channelhandler.js')

// start up prompt
client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    channelHandler(client)
    // load mongo
    await mongo().then(mongoose => {
        try {
            console.log("Connected to mongo!")
        } finally {
            mongoose.connection.close()
        }
    })
})



// handler prompt
client.on("message", cmdHandler);

// bot login
client.login(config.token);