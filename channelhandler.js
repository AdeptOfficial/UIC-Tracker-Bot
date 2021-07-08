/**
 * @author Leland 'AdepT' Moy
 * @license AdeptProduction
 * @file channelhandler.js
 * @info channel handler - lanuches per channel settings within the server
 */

// load channel settings
const advancedPolls = require('./channels/advancedPolls.js');

 module.exports = (client) => {
    advancedPolls(client)
    console.log("loaded channel settings!")
 }