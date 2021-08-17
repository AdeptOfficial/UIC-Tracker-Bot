module.exports = (client) => {
    const cooldown = new Set();    
    let hour = 60000 * 60
    client.on('message', function(msg) {
        if (cooldown.has(client.user.id)) {
            
        } else {
            if (msg.content.startsWith('thanks') || msg.content.startsWith('thx') || msg.content.startsWith('thnks') || msg.content.startsWith('ty')) {
                msg.reply('Consider thanking the person by using !thank @user :D')
            }
            console.log('thank reminder used')
            cooldown.add(client.user.id)
            setTimeout(() => {
                // Removes the user from the set after a minute
                cooldown.delete(client.user.id);
                console.log('thank reminder reset')
              }, hour);
        }
    })
}