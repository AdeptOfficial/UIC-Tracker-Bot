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


// listening to role claim events
client.on("ready", async () => {

    // update to tracker discord ids
    let guild = client.guilds.cache.find(guild => guild.id == '860320119036575804');
    let channel = await guild.channels.cache.find(ch => ch.id == '876999575947325470')

    // You can set any limit you want, for performance I used a low number
    channel.messages.fetch({ limit: 10 })
        .then(async messages => {
            messages.forEach(async message => {

                if (message.partial) await message.fetch();
                if (!message.guild) return;

                for (let reactionObj of message.reactions.cache) {
                    for (let reaction of reactionObj) {
                        if (typeof reaction == "string") continue;
                        reaction.users.fetch()
                    }
                }

            });
        })
        .catch(console.error);
});

// bot login
client.login(config.token);