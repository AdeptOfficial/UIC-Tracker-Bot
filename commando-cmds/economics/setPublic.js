/**
 * @author Leland 'AdepT' Moy
 * @license AdeptProduction
 * @file setPublic.js
 * @info set user's profile public settings (true/false)
 */

require('module-alias/register')
const Commando = require('discord.js-commando')
const profileModel = require('@schemas/economy/profile-schemas.js')
 
module.exports = class DiscordStatusCommand extends Commando.Command {
     constructor(client) {
         super(client, {
             name: 'setpublic',
             group: 'economics',
             memberName: 'econ settings',
             description: "set user's profile public setting",
             args: [{
                key: 'settings',
                prompt: 'Enable or Disable?',
                type: 'string',
                oneOf: ['Enable', 'Disable'],
             }]
         })
     }

     run = async (msg, { settings }) => {
        // finds a targeted user
        const target = msg.mentions.users.first()
        // if target is a bot
        if (target && target.bot === true) {
            msg.reply('Bots does not have a profile')
            return;
        }

        // found target
        else if (target && target.bot === false && target != msg.author.id) {
            msg.reply("You cannot change settings for other people's profiles")
            return;
        }

        // no targets, find current user's settings
        if (!target || target.id === msg.author.id) {
            let profileData;

            // find user's prfile
            try {
                profileData = await profileModel.findOne({ userID: msg.author.id });
            } catch (err) {
                console.log(err);
            }
            
            // update settings
            if (settings === 'enable') {
                if (profileData.public) {
                    msg.reply('Your profile is already public')
                    return
                }
                await profileModel.findOneAndUpdate({
                    userID: msg.author.id,
                    serverID: msg.guild.id,
                }, {
                    userID: msg.author.id,
                    serverID: msg.guild.id,
                    public: true,
                }, {
                    upsert: true
                })
                msg.reply('Your profile is now public')
            } else {
                if (!profileData.public) {
                    msg.reply('Your profile is already not public')
                    return
                }
                await profileModel.findOneAndUpdate({
                    userID: msg.author.id,
                    serverID: msg.guild.id,
                }, {
                    userID: msg.author.id,
                    serverID: msg.guild.id,
                    public: false,
                }, {
                    upsert: true
                })
                msg.reply('Your profile is now not public')
            }
        }
     }
}