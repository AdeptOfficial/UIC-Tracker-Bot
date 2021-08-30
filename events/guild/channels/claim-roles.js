// testing ground,      UIC tracker discord
let channels = ['881396805370261575', '780612474692173854']


let roleName = '';

function findRole (guild, emoji, user, add) {
    guild.roles.cache.forEach(role => {
        roleName = ''
        for(let i = 0; i < role.name.length; ++i) {
            if (role.name[i] != " ") {
                roleName += role.name[i].toLowerCase()
            }
        }
        if (roleName == emoji) {
            let member = guild.members.cache.find((member => member.id === user.id))
            console.log(role.name)
            if (add) {
                member.roles.add(role)
            } else {
                member.roles.remove(role)
            }
        }
    })
}

const handleReaction = (reaction, user, add) => {
    const emoji = reaction._emoji.name.toLowerCase()
    const { guild } = reaction.message

    findRole(guild, emoji, user, add)

    // // found role
    // console.log(roleName)
    // let role = guild.roles.cache.find(role => role.name === rolename)
    // let member = guild.members.cache.find((member => member.id === user.id))
    // if (role) {
    //     if (add) {
    //         member.roles.add(role)
    //     } else {
    //         member.roles.remove(role)
    //     }
    // } else {
    //     console.log('role does not exist')
    // }
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