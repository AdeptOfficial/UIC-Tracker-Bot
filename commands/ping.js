module.exports = {
    name: 'xping',
    cooldown: 5,
    permissions: 'none',
    description: 'says pongx!',
    execute(client, message, args, Discord, profileData) {
        message.channel.send('pongx!')
    }
}