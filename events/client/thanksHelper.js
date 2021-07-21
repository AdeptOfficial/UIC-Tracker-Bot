module.exports = (client) => {
    client.on('message', function(msg) {
        if(msg.content.startsWith('thanks') || msg.content.startsWith('thx') || msg.content.startsWith('thnks') || msg.content.startsWith('ty')) {
            msg.reply('Consider thanking the person by using !thank @user :D')
        }
    })
}