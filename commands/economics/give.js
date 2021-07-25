require('module-alias/register')
const profileModel = require('@schemas/economy/profile-schemas.js')

module.exports = {
    name: 'give',
    aliases: ["g"],
    cooldown: 10,
    permissions: [],
    description: 'give other people USD',
    async execute(client, message, args, Discord, profileData) {
        // make sure the command is correctly formated
        if (!args.length) {
            message.reply('Please mention a user and amount to give.')
            return
        }
        if (args.length > 2) {
            message.reply('Please only mention a user and amount to give.')
            return
        }
        // check which is amount, which is user
        const target = message.mentions.users.first();

        // @ user is invalid
        if (!target) {
            message.reply('That user does not exist!')
            return
        }

        // if target is the author
        if (target.id === message.author.id) {
            message.reply('You cannot give yourself money!')
            return
        }

        // if target is a bot
        if(target.bot) {
            message.reply('You cannot give a bot money!')
            return
        }

        // getting the amount
        let amount;
        if (!isNaN(args[0])) {
            let strAmount = args[0]
            amount = parseFloat(strAmount).toFixed(2)
        } else if (!isNaN(args[1])) {
            let strAmount = args[1]
            amount = parseFloat(strAmount).toFixed(2)
        } else {
            message.reply('Please add an amount to give!')
            return
        }

         // not enough USD to give
        if (amount > profileData.USD) {
            message.reply(`You don't have ${amount} USD in your balance to give.`)
            return
        }
        // compare user bal with amount
        try {
            const targetData = await profileModel.findOne({ userID: target.id});
            // targeted user don't have a profile setup yet
            if (!targetData) {
                message.reply('That user does not exist in the database!')
                return
            }

            // good to go
            await profileModel.findOneAndUpdate({
                userID: target.id
            }, {
                $inc: {
                    USD: +amount
                }
            }, {
                upsert: true
            })

            await profileModel.findOneAndUpdate({
                userID: message.author.id
            }, {
                $inc: {
                    USD: -amount
                }
            }, {
                upsert: true
            })

            return message.reply(`You have successfully give ${amount} USD to <@${target.id}>!`)

        } catch (err) {
            console.log(err)
        }
    }
}