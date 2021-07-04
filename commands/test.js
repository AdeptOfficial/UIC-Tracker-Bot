/**
 * @author Leland 'AdepT' Moy
 * @license AdeptProduction
 * @file test.js
 * @info testing bot cmd on discord
 */

module.exports = function (msg, tokens) {
    if (tokens.length === 0) {
        console.log("test function");
        msg.channel.send("Testing. Testing. Testing. \n Seems like it is working.")
    } else {
        console.log("invalid test cmd");
        msg.channel.send("Just type !test");
    }
}