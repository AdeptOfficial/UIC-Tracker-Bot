require('module-alias/register')
const config = require("@root/config.js");

function updateProjectRoles() {
    delete require.cache[require.resolve('@commands/role-claim/side-projects-roles.json')]   // Deleting loaded module
    const { projectRoles } = require("@commands/role-claim/side-projects-roles.json");
    return projectRoles
}

const handleProjectMsg = (client, Discord, channelid, roleList) => {
    let emojis = []
    let text = 'React here to unlock the respective course channels in the server.\n\n'
    let embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle(`-- **COMMUNITY PROJECT ROLES** --`)

    roleList.forEach(role => {
        // get emoji
        let trimed = role;
        while (trimed.indexOf(' ') >= 0) {
            trimed = trimed.replace(' ', '')
        }
        while (trimed.indexOf('-') >= 0) {
            trimed = trimed.replace('-', '')
        }
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

const editMessage = async (client, message, Discord, messageid, roleList) => {
    let emojis = []
    let text = 'React here to unlock the respective course channels in the server.\n\n'
    let editEmbed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle(`-- **COMMUNITY PROJECT ROLES** --`)

    roleList.forEach(role => {
        // get emoji
        let trimed = role;
        while (trimed.indexOf(' ') >= 0) {
            trimed = trimed.replace(' ', '')
        }
        while (trimed.indexOf('-') >= 0) {
            trimed = trimed.replace('-', '')
        }
        const Emoji = client.emojis.cache.find(emoji => emoji.name === trimed.toLowerCase())
        if (Emoji) {
            text += `${Emoji}: ${role}\n`
            emojis.push(Emoji)
        }
    })
    editEmbed.setDescription(text)

    message.channel.messages.fetch(messageid)
    .then(msg => {
        msg.edit(editEmbed)
        emojis.forEach(emoji => {
            msg.react(`${emoji}`)
        })
    })
    return
}


module.exports = {
    name: 'setupprojectroles',
    aliases: ['setpr'],
    cooldown: 5,
    expectedArgs: ["Optional: Type", "True/False"],
    permissions: 'OWNER',
    description: "Setting up community roles reaction message",
    // find the targeted bal user
    async execute (client, message, args, Discord, profileData, prefix) {
        if (message.author.id != config.ownerToken) {
            message.reply('You do not have permission to use this command!')
            return
        }
        
        // need update
        let channelid = '881396805370261575'
        let communityRoles = updateProjectRoles()

        if (args.length) {
            message.delete()
            let edit = args[0].toLowerCase()
            if (edit === 'true') {
                // need update
                const {guild}  = message
                const channel = guild.channels.cache.get(channelid)
                if (channel) {
                    const messages = await channel.messages.fetch()
                    const firstMessage = messages.first()
                    editMessage(client, message, Discord, firstMessage, communityRoles)
                }
                return
            }
        } else {
            console.log('preparing message')
            handleProjectMsg(client, Discord, channelid, communityRoles)
        }
        message.delete()
        return
    }
}