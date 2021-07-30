/**
 * @author Leland 'AdepT' Moy
 * @license AdeptProduction
 * @file channelhandler.js
 * @info channel handler - lanuches per channel settings within the server
 */
require('module-alias/register')
// load channel settings
const advancedPolls = require('@events/guild/channels/advancedPolls.js');
const thanksLeaderboard = require('@events/guild/channels/thanks-leaderboard.js');
const scheduleListener = require('@events/guild/channels/schedulelistener.js')

 module.exports = (client, Discord) => {
    advancedPolls(client)
    thanksLeaderboard(client)
    scheduleListener(client, Discord)
    console.log("loaded channel settings!")
 }