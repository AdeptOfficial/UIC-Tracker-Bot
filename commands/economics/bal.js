/**
 * @author Leland 'AdepT' Moy
 * @license AdeptProduction
 * @file bal.js
 * @info get balance of a user
 */

require('module-alias/register')
const profileModel = require('@schemas/economy/profile-schemas.js');
const { execute } = require('../ping');

module.exports = {
    name: 'bal',
    aliases: ['balance', 'balances'],
    description: "get user's balance",
    // find the targeted bal user
    execute (client, msg, args, Discord, profileData) {
        const target = msg.mentions.users.first()
        
        // case of: user first command
        if (profileData === null) {
            msg.reply("Your profile is being created, please retype the command.");
            return
        }
        // if none is mentioned or target is author - default to author's balances
        if (!target || target.id === msg.author.id) {
            // see if the author has a profile
            msg.reply(`Your wallet bal is ${profileData.USD} USD, you banks bal is ${profileData.bank} USD`);
            return;
        }

        // if target is a bot - 
        if(target.bot === true) {
            msg.reply('Bots does not have a profile')
            return
        }

        // target exist - check if profile is public
        if (target && target.bot === false) {
            // checking public settings
            if (profileData.public) {
                msg.reply(`<@${target.id}>'s wallet bal is ${profileData.USD} USD, banks bal is ${profileData.bank} USD`)
            } else if (!(profileData.public)) {
                msg.reply(`<@${target.id}>'s profile is currently not public`)
            }
            return;
        }
    }
}