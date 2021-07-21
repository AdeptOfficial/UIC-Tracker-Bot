require('module-alias/register')
const profileModel = require('@schemas/economy/profile-schemas.js')

module.exports = async (client, Discord, member) => {
    let profile = await profileModel.create({
        userID: member.id,
        serverID: member.guild.id,
        public: false,
        USD: 1000,
        bank: 0,
      });
      profile.save();
}