require('module-alias/register')
const Commando = require('discord.js-commando')
const thanksLeaderboardSchema = require('@schemas/thanks/thanks-leaderboard-schemas.js')

module.exports = class SetThanksLeaderboardCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'setthanksboard',
            group: 'thanks',
            memberName: 'setthanksboard',
            userPremission: [
                'ADMINISTRATOR'
            ],
            description: 'setting up thanks leaderboard'
        })
    }

    run = async (msg) => {
        const { guild, channel } = msg
        const guildId = guild.id
        const channelId = channel.id

        // update
        await thanksLeaderboardSchema.findOneAndUpdate({
            _id: guildId,
            channelId
        }, {
            _id: guildId,
            channelId
        }, {
            upsert: true
        })

        msg.reply('Thanks leaderboard set!')
        .then((msg) => {
            timeout: 1000 * 5
        })
        msg.delete()
    }
}