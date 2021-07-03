/**
 * @author Leland 'AdepT' Moy
 * @license AdeptProduction
 * @file test.js
 * @info testing bot cmd on discord
 */

module.exports = function (msg, args) {
    console.log("test function");
    msg.channel.send("Testing. Testing. Testing. \n Seems like it is working.")
}