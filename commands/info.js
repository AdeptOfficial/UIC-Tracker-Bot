require('module-alias/register')

module.exports = {
    name: 'info',
    //cooldown: 5,
    args: ['command name'],
    permissions: 'none',
    description: "Shows detailed information on a specified command",
    execute (client, msg, args, Discord, profileData, prefix) {
        // check args
        // no args
        if (!args.length) {
            msg.reply('Please specify the command that you would like to have info on!')
            return
        }
        // more than 1 args
        if (args.length > 1) {
            msg.reply(`Please make sure to use the correct command format: **${prefix}info (command)**.\n To get a list of all the supported commands, please type: **${prefix}commandslist**!`)
            return
        }
        let cmd = args[0]
        // checking arg is a command
        var command = client.commands.get(cmd)

        if (command) {
            console.log('command exist')

            //get infomation to display
            const { guild } = msg
            const { name, region} = guild
            const sendTime = msg.createdAt
            const icon = guild.iconURL()

            // get info on command

            var commandEmbed = new Discord.MessageEmbed()
            .setTitle(`Info on command "${command.name}"`)
            .setThumbnail(icon)
            // .setDescription(`${command.description}`)
            .addFields(
                { name: 'Description', value: command.description },
                )
            .setFooter(`Last Updated: ${sendTime}`)
            .setColor("RANDOM")

            // aliases
            if (command.aliases) {
                let aliases = '';
                for (let i = 0; i < command.aliases.length; ++i) {
                    if (i == command.aliases.length - 1) {
                        aliases += command.aliases[i]
                    } else {
                        aliases += command.aliases[i] + ', '
                    }
                }
                commandEmbed.addFields(
                    { name: 'Aliases', value: aliases, inline: true },
                )
            }

            // args
            if (command.expectedArgs) {
                // args
                let args = '';
                for (let i = 0; i < command.expectedArgs.length; ++i) {
                    if (i == command.expectedArgs.length - 1) {
                        args += command.expectedArgs[i]
                    } else {
                        args += command.expectedArgs[i] + ', '
                    }
                }
            }
            
            // cooldown
            if (command.cooldown) {
                commandEmbed.addFields(
                    { name: 'Cooldown time', value: command.cooldown },
                )
            }

            // permissions
            if (command.permissions != 'none' || command.permissions) {
                commandEmbed.addFields(
                    { name: 'Permission', value: command.permissions },
                )
            }

            msg.reply(commandEmbed)
            return
        } else {
            console.log('command does not exist')
            msg.reply(`${cmd} does not exist.\nTo get a list of all the supported commands, please type: **${prefix}commandslist**!`)
            return
        }


    }
}