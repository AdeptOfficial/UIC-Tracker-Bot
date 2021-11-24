                  // testing grounds,      UIC Tracker
const channels = ['870788489770328177', '913214102279700520']
require('module-alias/register')
const { schedules } = require('@Util/school/schedules.json') 
const addSchedule = require('@Util/school/addSchedule.js') 

module.exports = (client, Discord) => {
    client.on('message', message => {
        if (channels.includes(message.channel.id)) {
            console.log(message.content)
            //console.log(message.attachments.array()[0].attachment)
            let url = ''
            message.attachments.forEach(attachment => {
                url = attachment.url
            })
            user = message.author.id
            username = message.author.username
            content = message.content.toUpperCase()
            let newObj = {
                userID: user,
                username: username,
                semester: 'FALL 2021',
                scheduleURL: url
            }
            schedules.push(newObj)

            addSchedule(schedules)
            // get member
            const member = message.guild.members.cache.get(user);
            // role
            var role = message.member.guild.roles.cache.find(role => role.name === "scheduled");
            member.roles.add(role);
        }
    })
}