require('module-alias/register')
const profileModel = require('@schemas/economy/profile-schemas.js')

module.exports = {
    name: 'withdraw',
    aliases: ["wd"],
    permissions: [],
    description: 'withdraw USD into your bank!',
    async execute(client, message, args, Discord, profileData) {
        // get amount to withdraw
        const strAmount = args[0]

        // not a number
        if (isNaN(strAmount)) {
            message.reply('Invalid withdraw amount')
            return
        }

        // string to float and fixed 2 decimal place
        let amount = parseFloat(strAmount).toFixed(2)

        // invalid withdraw amount
        if (amount < 0) {
            message.reply('You cannot withdraw a negative amount')
            return
        }

        // get user's bank bal and compare amount
        try {
            // not enough USD to withdraw
            if (amount > profileData.bank) {
                message.reply(`You don't have ${amount} USD in your bank to withdraw.`)
                return
            }

            // have enough
            await profileModel.findOneAndUpdate({
                userID: message.author.id
            }, {
                $inc: {
                    USD: +amount,
                    bank: -amount,
                }
            }, {
                upsert: true
            })
            return message.reply(`You have successfully withdrew ${amount} USD from your bank!`)
        } catch (err) {
            console.log(err)
        }
    }
}