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
const getCourseRole = require('@events/guild/channels/reactcourserole.js')
//const getCrypto = require('@events/guild/economics/getCrypto.js')

 module.exports = (client, Discord) => {
    advancedPolls(client)
    thanksLeaderboard(client)
    scheduleListener(client, Discord)
    getCourseRole(client, Discord)
    //getCrypto()
    console.log("loaded channel settings!")
 }