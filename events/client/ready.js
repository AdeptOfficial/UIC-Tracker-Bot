/**
 * @author Leland 'AdepT' Moy
 * @license AdeptProduction
 * @file ready.js
 * @info readys the bot, handles connections with database
 */

const mongo = require('./mongo');
const thanksHelper = require('./thanksHelper');


require('module-alias/register')
module.exports = (client, Discord, message) => {
    // basic login prompt
    console.log(`Logged in as ${client.user.tag}!`);

    mongo(client)
    thanksHelper(client)
}