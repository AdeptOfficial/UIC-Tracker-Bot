require('module-alias/register')
const profileModel = require('@schemas/economy/profile-schemas.js')

module.exports = {
    name: 'deposit',
    aliases: ["dep"],
    permissions: [],
    description: 'desposit USD into your bank!',

    async execute(client, message, args, Discord, profileData) {
        const strAmount = args[0]

        // not a number
        if (isNaN(strAmount)) {
            message.reply('Invalid deposit amount')
            return
        }
        // string to float and fixed 2 decimal place
        let amount = parseFloat(strAmount).toFixed(2)

        // invalid deposit amount
        if (amount < 0) {
            message.reply('You cannot deposit a negative amount')
            return
        }

        // get user's balances and compare amount
        try {
            // not enough USD to deposit
            if (amount > profileData.USD) {
                message.reply(`You don't have ${amount} USD in your balance to deposit.`)
                return
            }

            // have enough
            await profileModel.findOneAndUpdate({
                userID: message.author.id
            }, {
                $inc: {
                    USD: -amount,
                    bank: +amount,
                }
            }, {
                upsert: true
            })
            return message.reply(`You have successfully deposited ${amount} USD into your bank!`)
        } catch (err) {
            console.log(err)
        }
    },
};