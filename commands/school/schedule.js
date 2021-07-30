const fs = require('fs')
require('module-alias/register')

function updateSchedule() {
    delete require.cache[require.resolve('@Util/school/schedules.json')]   // Deleting loaded module
    const { schedules } = require("@Util/school/schedules.json");
    return schedules
}


module.exports = {
    name: 'schedule',
    aliases: ['sche'],
    cooldown: 10,
    args: ["@user"],
    permissions: 'none',
    description: "Gets the schedule of an user",
    execute (client, message, args, Discord, profileData, prefix) {
        if (!args.length) {
            message.reply('Please specify the user.')
            return
        }

        const target = message.mentions.users.first();
        if (!target) return message.repy('That user does not exist!')

        let schedules = updateSchedule()
        let url = ''
        let semester = ''
        schedules.forEach(schedule => {
           if (schedule.userID = target.id) {
               url = schedule.scheduleURL
               semester = schedule.semester
           }
        })

        const scheduleEmbed = new Discord.MessageEmbed()
        .setTitle(`${target.username}'s schedule for ${semester}`)
        .setDescription('------------ ✨ Schedule ✨ ------------')
        .setColor("RANDOM")
        .setThumbnail(target.displayAvatarURL({dynamic: true}))
        .setImage(url)
        .setFooter('UIC-TRACKER-SERVICE ©2021', message.guild.iconURL())

        message.reply(`Here is ${target.username}'s schedule!`, scheduleEmbed)

        return
    }
}