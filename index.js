/**
 * @author Leland 'AdepT' Moy
 * @license AdeptProduction
 * @file index.js
 * @info main code for UIC Tracker Bot
 */
// basic setup
const path = require('path')
const config = require("./config.js");
const Discord = require('discord.js')
const Commando = require('discord.js-commando')

const client = new Commando.CommandoClient({
    owner: config.ownerToken,
    fetchAllMembers: true
})

client.commands = new Discord.Collection();
client.events = new Discord.Collection();
// handlers
['event-handler', 'channelhandler', 'command-handler'].forEach (handler => {
    require(`./handlers/${handler}`)(client, Discord);
})


client.on('ready', async () => {
    //load commando settings and cmds
    client.registry
    .registerDefaultTypes()
    .registerDefaultGroups()
    .registerDefaultCommands({
        unknownCommand: false,
    })
    .registerGroups([
        ['misc', 'misc commands'],
        ['moderation', 'moderation commands'],
        ['users', 'common user commands'],
        ['thanks', 'commands to help thank people'],
        ['economics', 'commands related to economics']
    ])
    .registerCommandsIn(path.join(__dirname, 'commando-cmds'))
})


// bot login
client.login(config.token);