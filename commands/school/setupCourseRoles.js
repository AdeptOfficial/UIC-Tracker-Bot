require('module-alias/register')
const config = require("@root/config.js");

const handleCourseMsg = (client, Discord, channelid, roleList, course) => {
    let emojis = []
    let text = 'React here to unlock the respective course channels in the server.\n\n'
    let embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle(`-- **${course} COURSES** --`)

    roleList.forEach(role => {
        // get emoji
        let trimed = role.replace(' ', '')
        const Emoji = client.emojis.cache.find(emoji => emoji.name === trimed.toLowerCase())
        if (Emoji) {
            text += `${Emoji}: ${role}\n`
            emojis.push(Emoji)
        }
    })
    embed.setDescription(text)


    client.channels.cache.get(channelid).send(embed).then(msg => {
        emojis.forEach(emoji => {
            msg.react(`${emoji}`)
        })
    })
}

const editMessage = async (client, message, Discord, messageid, roleList, course) => {
    let emojis = []
    let text = 'React here to unlock the respective course channels in the server.\n\n'
    let editEmbed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle(`-- **${course} COURSES** --`)

    roleList.forEach(role => {
        // get emoji
        let trimed = role.replace(' ', '')
        const Emoji = client.emojis.cache.find(emoji => emoji.name === trimed.toLowerCase())
        if (Emoji) {
            text += `${Emoji}: ${role}\n`
            emojis.push(Emoji)
        } else {
            console.log(`${trimed} not found`)
        }
    })
    editEmbed.setDescription(text)

    message.channel.messages.fetch(messageid)
    .then(message => {
        console.log('editing message')
        message.edit(editEmbed)
        emojis.forEach(emoji => {
            message.react(`${emoji}`)
        })
    })
    return
}

module.exports = {
    name: 'setupcourseroles',
    aliases: ['setupcrs'],
    cooldown: 5,
    expectedArgs: ["Optional: Type", "True/False"],
    permissions: 'OWNER',
    description: "Setting up course roles reaction message",
    // find the targeted bal user
    async execute (client, message, args, Discord, profileData, prefix) {
        if (message.author.id != config.ownerToken) {
            message.reply('You do not have permission to use this command!')
            return
        }
                    // testing ground Update
        let channel = '876999575947325470'
                        // CS
        let ccsRoles = ['CS 111', 'CS 141', 'CS 151', 'CS 211', 'CS 251', 'CS 261', 'CS 301', 'CS 341', 'CS 342', 'CS 361', 'CS 362', 'CS 377', 'CS 401']
        let ecsRoles = ['CS 294', 'CS 411', 'CS 412', 'CS415', 'CS 418', 'CS 421', 'CS 425', 'CS 428', 'CS 440', 'CS 441', 'CS 474', 'CS 480', 'CS 484']
        // Math
        let mathRoles = ['MATH 210', 'MATH 215', 'MATH 220', 'MATH 310']
        // IE
        let ieRoles = ['IE 342']
        // STAT
        let statRoles = ['STAT 381']

        let courseType = args[0].toLowerCase()
        let edit = args[1].toLowerCase()

        if (edit === 'true') {
            if (courseType.toUpperCase() === 'CORE') {
                editMessage(client, message, Discord, '881416515721756722', ccsRoles, 'CORE CS')
            } else if (courseType.toUpperCase() === 'TECH') {
                editMessage(client, message, Discord, '878070432199237683', ecsRoles, 'TECH ELECTIVES')
            } else if (courseType.toUpperCase() === 'MATH') {
                editMessage(client, message, Discord, '878070433516245002', mathRoles, 'MATH')
            } else if (courseType.toUpperCase() === 'IE') {
                editMessage(client, message, Discord, '878070434371866694', ieRoles, 'IE')
            } else if (courseType.toUpperCase() === 'STAT') {
                editMessage(client, message, Discord, '878070434761945141', statRoles, 'STAT')
            }

            return
        }
        
        if (!args.length) {
            handleCourseMsg(client, Discord, channel, ccsRoles, 'CORE CS')
            handleCourseMsg(client, Discord, channel, ecsRoles, 'TECH ELECTIVES')
            handleCourseMsg(client, Discord, channel, mathRoles, 'MATH')
            handleCourseMsg(client, Discord, channel, ieRoles, 'IE')
            handleCourseMsg(client, Discord, channel, statRoles, 'STAT')
        } else if (courseType.toLowerCase() === 'core') {
            handleCourseMsg(client, Discord, channel, ccsRoles, 'CORE CS')
        } else if (courseType.toLowerCase() === 'tech') {
            handleCourseMsg(client, Discord, channel, ecsRoles, 'TECH ELECTIVES')
        } else if (courseType.toLowerCase() === 'MATH') {
            handleCourseMsg(client, Discord, channel, mathRoles, 'MATH')
        } else if (courseType.toLowerCase() === 'IE') {
            handleCourseMsg(client, Discord, channel, ieRoles, 'IE')
        } else if (courseType.toLowerCase() === 'STAT') {
            handleCourseMsg(client, Discord, channel, statRoles, 'STAT')
        }

        return
    }
}