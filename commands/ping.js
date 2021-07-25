module.exports = {
    name: 'xping',
    cooldown: 5,
    description: 'says ping!',
    execute(client, message, args, Discord, profileData) {
        message.channel.send('pongx!')
    }
}