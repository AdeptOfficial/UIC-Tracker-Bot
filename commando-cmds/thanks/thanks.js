require('module-alias/register')
const Commando = require('discord.js-commando')
const thanksSchema = require('@schemas/thanks/thanks-schemas.js')

module.exports = class ThanksCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'thanks',
            group: 'thanks',
            memberName: 'thanks',
            description: 'thanks a user for helping you'
        })
    }

    run = async (msg) => {
        // find the target thank user
        const target = msg.mentions.users.first()

        // if none is mentioned
        if (!target) {
            msg.reply('Please specify someone to thank!')
            return
        }

        // get msg infomation
        const { guild } = msg
        const guildId = guild.id
        const targetId = target.id
        const authorId = msg.author.id
        const now = new Date()

        if (targetId === authorId) {
            msg.reply('You cannot thank yourself!')
            return
        }

        let authorData = await thanksSchema.findOne({
            userId: authorId,
            guildId
        })
        if (!authorData) {
            let profile = await thanksSchema.create({
                userId: authorId,
                guildId: guild.id,
                received: 0,
            });
            profile.save();
        }

        if (authorData && authorData.lastGave) {
            const then = new Date(authorData.lastGave)

            const diff = now.getTime() - then.getTime()
            const diffHours = Math.round(diff / (1000 * 60 * 60))

            const hours = 24
            const timeLeft = hours - diffHours
            if (diffHours <= hours) {
                msg.reply(`You have already thanked someone within the last ${hours} hours. \n You must wait ${timeLeft} hours before thanking another user!`)
                return
            }
        }
        
        // Update the lastGave property for the command sender
        await thanksSchema.findOneAndUpdate({
            userId: authorId,
            guildId
        }, {
            userId: authorId,
            guildId,
            lastGave: now
        }, {
            upsert: true
        })

        // increase thanks count for targeted user
        const result = await thanksSchema.findOneAndUpdate({
            userId: targetId,
            guildId
        }, {
            userId: targetId,
            guildId,
            $inc: {
                received: 1
            }
        }, {
            upsert: true,
            new: true
        })

        const amount = result.received
        msg.reply(`You have thanked <@${targetId}>! They now have ${amount} thanks.`)
    }
}