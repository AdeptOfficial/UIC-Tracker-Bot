/**
 * @author Leland 'AdepT' Moy
 * @license AdeptProduction
 * @file cmdhandler.js
 * @status INACTIVE
 * @info command handler - cmds stored into an object, check if cmd exists.
 */

// import prefix
const { prefix } = require('./config.js');

//
// import cmds
//

// user cmds
const testFunction = require('./commands/test');
const serverInfo = require('./commands/serverInfo');
// admin cmds

// owner cmds
const rmCourseRoles = require('./commands/rmCourseRoles');

//
// cmd list
//
const commands = {
    // users
    test: testFunction,
    serverinfo: serverInfo,
    createprofile: createProfile,
    // admins

    // owner
    removeCourseRoles: rmCourseRoles,
};

//
// cmd handler
//
module.exports = async function (msg) {
    // check content
    let tokens = msg.content.split(" ");
    let command = tokens.shift();
    // used prefix
    if (command.charAt(0) === prefix) {
        command = command.substring(1);
        try { // if cmd is in the cmds list
            commands[command](msg, tokens);
        } catch (error) { // unknown cmd
            console.log(`${command} is an unknown command\n`, error);
            return;
        }
    }
};