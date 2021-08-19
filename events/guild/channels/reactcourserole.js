             // testing ground,      UIC tracker discord
let channels = ['876999575947325470', '780612474692173854']

const handleReaction = (reaction, user, add) => {
    const emoji = reaction._emoji.name
    const { guild } = reaction.message
    let first = true
    let trim = emoji.toUpperCase()
    let roleName = ''
    for(let i = 0; i < trim.length; i++){
        if (isNaN(trim[i])) {
            roleName += trim[i]
        } else {
            if (first) {
                roleName += ' '
                first = false
            }
            roleName += trim[i]
        }
    }


    let role = guild.roles.cache.find(role => role.name === roleName)

    let member = guild.members.cache.find((member => member.id === user.id))
    if (role) {
        if (add) {
            member.roles.add(role)
        } else {
            member.roles.remove(role)
        }
    } else {
        console.log('role does not exist')
    }
}

module.exports = async (client, Discord) => {
    client.on('messageReactionAdd', async (reaction, user) => {
        if (reaction.partial) {
            // If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
            try {
                await reaction.fetch();
            } catch (error) {
                console.log('Something went wrong when fetching the message: ', error);
                // Return as `reaction.message.author` may be undefined/null
                return;
            }
        }

        if (channels.includes(reaction.message.channel.id) && !user.bot) {
            console.log('reaction added')
            handleReaction(reaction, user, true)
        }
    })

    
    client.on('messageReactionRemove', async (reaction, user) => {
        if (reaction.partial) {
            // If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
            try {
                await reaction.fetch();
            } catch (error) {
                console.log('Something went wrong when fetching the message: ', error);
                // Return as `reaction.message.author` may be undefined/null
                return;
            }
        }

        if (channels.includes(reaction.message.channel.id) && !user.bot) {
            console.log('reaction removed')
            handleReaction(reaction, user, false)
        }
    })
}