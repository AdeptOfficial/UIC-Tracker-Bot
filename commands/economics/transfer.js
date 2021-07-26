require('module-alias/register')
const profileModel = require('@schemas/economy/profile-schemas.js')
const { connect } = require('mongoose')

module.exports = {
    name: 'transfer',
    cooldown: 10,
    aliases: ["t"],
    expectedArgs: ["Positive Amount", "<@user>"],
    permissions: 'none',
    description: "Transfer amount from user bank to another person's bank",
    async execute(client, message, args, Discord, profileData) {
        // make sure the command is correctly formated
        if (!args.length) {
            message.reply('Please mention a user and amount to transfer.')
            return
        }

        if (args.length > 2) {
            message.reply('Please only mention a user and amount to transfer.')
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
            message.reply('You cannot transfer money to yourself!')
            return
        }

        // if target is a bot
        if(target.bot) {
            message.reply('You cannot transfer money to a bot!')
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
            message.reply('Please add an amount to transfer!')
            return
        }

            // not enough USD to transfer
        if (amount > profileData.bank) {
            message.reply(`You don't have ${amount} USD in your bank to transfer.`)
            return
        }

        // compare user bank with amount
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
                    bank: +amount
                }
            }, {
                upsert: true
            })

            await profileModel.findOneAndUpdate({
                userID: message.author.id
            }, {
                $inc: {
                    bank: -amount
                }
            }, {
                upsert: true
            })

        } catch (err) {
            console.log(err)
        }
    }
}