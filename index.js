/**
 * @author Leland 'AdepT' Moy
 * @license AdeptProduction
 * @file main.js
 * @info main code for UIC Tracker Bot
 */

// basic setup
const Discord = require("discord.js");
//const client = new Discord.Client();
const client = new Discord.Client(
    {fetchAllMembers: true}
);
const config = require("./config.js");
// cmd handler
const cmdHandler = require('./cmdhandler.js');

// start up prompt
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
})



// cmd Handler prompt
client.on("message", cmdHandler);

// bot login
client.login(config.token);