/**
 * @author Leland 'AdepT' Moy
 * @license AdeptProduction
 * @file discord-status.js
 * @info update/set discord status
 */
const Commando = require('discord.js-commando')

module.exports = class DiscordStatusCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'status',
            group: 'misc',
            memberName: 'discordstatus',
            userPremission: [
                'ADMINISTRATOR'
            ],
            description: 'set/update discord status',
            args: [{
                key: 'activity',
                prompt: 'What is the bot doing?',
                type: 'string',
                oneOf: ['PLAYING', 'WATCHING', 'STREAMING', 'LISTENING', 'COMPETING'],
            }, {
                key: 'content',
                prompt: 'what is the actual content?',
                type: 'string'
            }, {
                key: 'status',
                prompt: 'What is the status of the bot?',
                oneOf: ['online', 'idle', 'invisible', 'dnd'],
                type: 'string',
            }, {
                key: 'urlOption',
                prompt: 'is there an URL?',
                oneOf: [ 'yes', 'no'],
                type: 'string',
            }, {
                key: 'url',
                prompt: 'What is the URL link? If you said no to the previous question, type "NA"',
                type: 'string',
            }]
        })
    }

    run (msg, { content, activity, urlOption, url, status }) {
        let ing = activity.toUpperCase()
        if (urlOption === 'yes' && content != '') {
            this.client.user.setPresence({
                activity: {
                    name: `${content}`,
                    type: `${ing}`,
                    url: `${url}`
                },
                status: `${status}`
            })
            .then(console.log(`${ing} ${content} with ${url}`))
            .catch(err => console.error(err))
        } else if (urlOption === 'no' && content != '') {
            this.client.user.setPresence({
                activity: {
                    name: `${content}`,
                    type: `${ing}`,
                },
                status: `${status}`
            })
            .then(console.log(`${ing} ${content}`))
            .catch(err => console.error(err))
        } else {
            this.client.user.setPresence({
                activity: {
                    name: '',
                    type: '',
                },
                status: `${status}`
            })
            .then(console.log(`set Activity to none`))
            .catch(err => console.error(err))
        }
    }
}