/**
 * @author Leland 'AdepT' Moy
 * @license AdeptProduction
 * @file test.js
 * @info testing bot cmd on discord
 */

const Commando = require('discord.js-commando')


module.exports = class TestCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'test',
            group: 'misc',
            memberName: 'misc',
            description: 'test cmd to check if bot is connected'
        })
    }

    run = function (msg, tokens) {
        if (tokens.length === 0) {
            console.log("test function");
            msg.channel.send("Testing. Testing. Testing. \n Seems like it is working.")
        } else {
            console.log("invalid test cmd");
            msg.channel.send("Just type !test");
        }
    }
}