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
    cooldown: 10,
    description: "get user's balance",
    // find the targeted bal user
    async execute (client, msg, args, Discord, profileData) {
        const target = msg.mentions.users.first()
        
        // case of: user first command
        if (profileData === null) {
            msg.reply("Your profile is being created, please retype the command.");
            return
        }
        // if none is mentioned or target is author - default to author's balances
        if (!target || target.id === msg.author.id) {
            // see if the author has a profile
            let wallet = profileData.USD.toFixed(2)
            let bank = profileData.bank.toFixed(2)
            let d = new Date()
            date = d.getHours() + ":" + d.getMinutes() + ", " + d.toDateString();

            // set up embed message
            let balEmbed = new Discord.MessageEmbed()
            .setTitle(`${msg.author.username}'s Balance`)
            .setDescription(`Wallet: $${wallet} \nBank: $${bank}`)
            .setColor("RANDOM")
            .setThumbnail(msg.author.displayAvatarURL({dynamic: true}))
            .setFooter(`Last updated: ${date}`, msg.guild.iconURL())
            // msg.reply(`\n Wallet: ${wallet} USD \n Bank: ${bank} USD`);
            client.users.cache.get(msg.author.id).send(balEmbed)
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
            const targetData = await profileModel.findOne({ userID: target.id});

            if (!targetData) {
                message.reply('That user does not exist in the database!')
                return
            }

            if (targetData.public) {
                let wallet = targetData.USD.toFixed(2)
                let bank = targetData.bank.toFixed(2)
                // msg.reply(`\n <@${target.id}>'s Wallet: ${wallet} USD \n <@${target.id}>'s Bank: ${bank} USD`);
                let d = new Date()
                let sign = ':10283heavydollarsign:'
                date = d.getHours() + ":" + d.getMinutes() + ", " + d.toDateString();
                // set up embed message
                let balEmbed = new Discord.MessageEmbed()
                .setTitle(`${target.username}'s Balance`)
                .setDescription(`Wallet: $${wallet} \nBank: $${bank}`)
                .setColor("RANDOM")
                .setThumbnail(target.displayAvatarURL({dynamic: true}))
                .setFooter(`Last updated: ${date}`, msg.guild.iconURL())

                msg.reply(balEmbed)
            } else if ((!targetData.public)) {
                msg.reply(`<@${target.id}>'s profile is currently not public`)
            }
            return;
        }
    }
}