const fs = require('fs')
require('module-alias/register')

module.exports = {
    name: 'commandlist',
    aliases: ['cmdls', 'cmdlist', 'cmds'],
    cooldown: 5,
    args: ["none"],
    permissions: 'none',
    description: "Show all commands to a user in embed message",
    execute (client, msg, args, Discord, profileData, prefix) {
        // getting all cmds
        let gcmds = ''
        let thxCmds = ''
        const command_files = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

        for (const file of command_files) {
            const command = require(`@commands/${file}`);
            if (command.name) {
                gcmds += command.name
                gcmds += '\n'
            }
        }
    
        let specCmds = ''
        // load commands with folders
        const load_dir = (dirs) => {
            const command_files = fs.readdirSync(`./commands/${dirs}`).filter(file => file.endsWith('.js'));
            for (const file of command_files) {
                const command = require(`@commands/${dirs}/${file}`)
                if (command.name) {
                    specCmds += command.name
                    specCmds += '\n'
                }
            }
        }
    
        ['economics'].forEach(e => load_dir(e));

        // extra commando cmds
        specCmds += 'setpublic*'
        specCmds += '\n'
        gcmds += 'serverinfo*'
        gcmds += '\n'


        //get infomation to display
        const { guild } = msg
        const { name, region} = guild
        const sendTime = msg.createdAt
        const icon = guild.iconURL()

        // building embed message
        const embed = new Discord.MessageEmbed()
        .setTitle(`Commands list for "${name}"`)
        .setThumbnail(icon)
        .addFields(
        { name: 'Server Name', value: name, },
        { name: "Region", value: region, },
        { name: "Prefix", value: prefix, },
        { name: 'General Commands', value: `${gcmds}`, inline: true },
        { name: 'Economic Commands', value: `${specCmds}`, inline: true },
        )
        .setFooter(`*supported by commando, for info on these commands, please let me know! \nLast Updated: ${sendTime}`)
        .setColor('RANDOM')

        //send embed message
        msg.channel.send(embed)

    }
}