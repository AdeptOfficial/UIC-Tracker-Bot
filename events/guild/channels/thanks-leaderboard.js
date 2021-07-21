require('module-alias/register')
const thanksLeaderboardSchema = require('@schemas/thanks/thanks-leaderboard-schemas.js')
const thanksSchema = require('@schemas/thanks/thanks-schemas.js')

const fetchTopMemebers = async (guildId, date) => {
    let text = ''

    const results = await thanksSchema.find({
        guildId
    }).sort({
        // descending order
        received: -1
    }).limit(10) // top 10

    for (let counter = 0; counter < results.length; ++counter) {
        // get user id and number of received thanks, if none thanks, then defualt to 0
        const { userId, received = 0 } = results[counter]
        text += `#${counter + 1} <@${userId}> with ${received} thanks\n`
    }

    text += '\nThis is updated every minute'
    text += `\nLast Updated: ${date}`

    return text
}

const updateLeaderboard = async (client) => {
    // get items from collections
    const results = await thanksLeaderboardSchema.find({})

    for (const result of results) {
        const { channelId,  _id: guildId } = result

        // bot exist within the server
        const guild = client.guilds.cache.get(guildId)
        if (guild) {
            // channel exist within the server
            const channel = guild.channels.cache.get(channelId)
            const time = new Date()
            const d = new Date();
            date = d.getHours() + ":" + d.getMinutes() + ", " + d.toDateString();
            if (channel) {
                const messages = await channel.messages.fetch()
                const firstMessage = messages.first()
                const topMembers = await fetchTopMemebers(guildId, date)
                if (firstMessage) {
                    firstMessage.edit(topMembers)
                } else {
                    channel.send(topMembers)
                }
            }
        }
    }

    setTimeout(() => {
        updateLeaderboard(client)
        console.log('updated thanks-leaderboard')
    }, 1000 * 60) // 60 seconds
}

module.exports = async (client) => {
    updateLeaderboard(client)
}