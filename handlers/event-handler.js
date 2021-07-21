/**
 * @author Leland 'AdepT' Moy
 * @license AdeptProduction
 * @file event-handler.js
 * @status ACTIVE
 * @info event handler - handles client/guild events
 */

const fs = require('fs');
require('module-alias/register')

//opens event-handler folder, and go through each files that is a js file
module.exports = ( client, Discord ) => {
    const load_dir = (dirs) => {
        const events_files = fs.readdirSync(`./events/${dirs}`).filter(file => file.endsWith('.js'));
        
        for (const file of events_files) {
            const event = require(`@events/${dirs}/${file}`);
            const event_name = file.split('.')[0];
            client.on(event_name, event.bind (null, client, Discord));
        }
    }

    ['client', 'guild'].forEach(e => load_dir(e));
}