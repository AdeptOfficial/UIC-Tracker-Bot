/**
 * @author Leland 'AdepT' Moy
 * @license AdeptProduction
 * @file command-handler.js
 * @status ACTIVE
 * @info command handler - loads in commands from command folder
 */

const fs = require('fs')
require('module-alias/register')

module.exports = ( client, Discord ) => {
    // load commands without folders
    const command_files = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

    for (const file of command_files) {
        const command = require(`@commands/${file}`);
        if (command.name) {
            client.commands.set(command.name, command);
        } else {
            continue;
        }

    }

    // load commands without folders
    const load_dir = (dirs) => {
        const command_files = fs.readdirSync(`./commands/${dirs}`).filter(file => file.endsWith('.js'));
        for (const file of command_files) {
            const command = require(`@commands/${dirs}/${file}`)
            if (command.name) {
                client.commands.set(command.name, command);
            } else {
                continue;
            }
        }
    }

    ['economics'].forEach(e => load_dir(e));
}