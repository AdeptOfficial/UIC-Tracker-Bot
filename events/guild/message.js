require('module-alias/register')
const profileModel = require('@schemas/economy/profile-schemas.js')

module.exports = async (client, Discord, message) => {
    // temp prefix
    const prefix = 'test!' 
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    // create profile if first time user
    let profileData;
    try {
      profileData = await profileModel.findOne({ userID: message.author.id });

      if (!profileData) {
        let profile = await profileModel.create({
          userID: message.author.id,
          serverID: message.guild.id,
          public: false,
          USD: 1000,
          bank: 0,
        });
        profile.save();
      }
    } catch (err) {
      console.log(err);
    }

    // getting command and args
    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd);
    if (command) {
      try {
        command.execute(client, message, args, Discord, profileData);
      } catch (err) {
        message.reply("There was an error executing this command!");
        console.log(err)
      }
    }

}