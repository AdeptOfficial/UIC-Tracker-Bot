/**
 * @author Leland 'AdepT' Moy
 * @license AdeptProduction
 * @file advancedPolls.js
 * @info creating polls
 */

const { Message } = require("discord.js")

// poll channel list
//                  testing ground    ,  Tracker Poll,         Tech Support,             Community mod
const channels = ['862499931109851166', '802614902979166228', '787043179630952450', '799701775287713892']

module.exports = (client) => {
    client.on('message', msg => {
        // getting the message from poll
        const { channel, content } = msg

        if (!channels.includes(channel.id)) {
          return
        }
        const eachLine = content.split('\n')


        for  (const line of eachLine) {
            if (line.includes('=')) {
                const sp = line.split('=')
                const emoji = sp[0].trim()
                msg.react(emoji)
            } else if (line.includes('-')) {
                const sp = line.split('-')
                const emoji = sp[0].trim()
                msg.react(emoji)
            } else if (line.includes('==')) {
                const sp = line.split('==')
                const emoji = sp[0].trim()
                msg.react(emoji)
            }
        }
        console.log("Poll has been created.")
    })
}