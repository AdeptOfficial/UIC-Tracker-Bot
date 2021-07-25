require('module-alias/register')
const profileModel = require('@schemas/economy/profile-schemas.js')
const config = require("@root/config.js");
var MongoClient = require('mongodb').MongoClient;
const cooldowns = new Map();

module.exports = async (client, Discord, message) => {
  // connecting to db to get settings
  MongoClient.connect(config.mongoPath, {
    useUnifiedTopology: true
  }, async function (err, db) {
    if (err) throw err;
    var dbo = db.db("Tracker");
  // checks which guild we are in
  if (message.guild != null) {
      let guildId = message.guild.id
      dbo.collection("settings").findOne({
        guild: `${guildId}`
      }, async function (err, result) {
        // getting prefix
        let prefix = result.settings.prefix
        if (!message.content.startsWith(prefix) || message.author.bot) return;
        // create profile if first time user
        let profileData;
        try {
          profileData = await profileModel.findOne({
            userID: message.author.id
          });

          if (!profileData) {
            let profile = await profileModel.create({
              userID: message.author.id,
              serverID: message.guild.id,
              public: false,
              USD: 1000.01,
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
        
        // check if command has a cool down
        if (command != undefined) {
          if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Discord.Collection());
          }

                // get the current time
        const current_time = Date.now();
        // get time stamp
        const time_stamps = cooldowns.get(command.name);
        // get cooldown amount (sec * 1000 for ms)
        const cooldown_amount = (command.cooldown) * 1000

        // check author.id and command time
        if (time_stamps.has(message.author.id)) {
          // when command is available to the user
          const expiration_time = time_stamps.get(message.author.id) + cooldown_amount;

          // check how long
          if (current_time < expiration_time) {
            const time_left = (expiration_time - current_time) / 1000;
            return message.reply(`Please wait ${time_left.toFixed(1)} more seconds before using ${command.name}.`)
          }
        }

        // time stamps and author id to map
        time_stamps.set(message.author.id, current_time)

        // setTimeout
        setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);
      }

        if (command) {
          try {
            command.execute(client, message, args, Discord, profileData, prefix);
          } catch (err) {
            message.reply("There was an error executing this command!");
            console.log(err)
          }
        }
      })
    }
  })
}