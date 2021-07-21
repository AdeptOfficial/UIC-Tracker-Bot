module.exports = {
    name: 'xping',
    description: 'says ping!',
    execute(client, message, args, Discord, profileData) {
        message.channel.send('pongx!')
    }
}