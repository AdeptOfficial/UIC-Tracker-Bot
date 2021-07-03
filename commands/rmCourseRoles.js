/**
 * @author Leland 'AdepT' Moy
 * @license AdeptProduction
 * @file rmCourseRoles.js
 * @info Remove all courses roles from all trackers to be able to prepare for the new semester
 */

const config = require("./../config.js");

const Discord = require("discord.js");
const client = new Discord.Client(
    {fetchAllMembers: true}
);

module.exports = function (msg) {
    if (msg.author.id === config.ownerToken) {

        // testing
        console.log("remove course role function");

        // get all the roles and store them in an array
        var rolesArray = [];
        msg.guild.roles.cache.each(roles => rolesArray.push(roles.name))
        //console.log(rolesArray);

        // go through roles
        for (const x in rolesArray) {
            // replace all unnecessary characters in a roles 
            rolesArray[x].replace("'", " ");
            // courses roles
            if (rolesArray[x].startsWith('CS ') || rolesArray[x].startsWith('MATH ') || rolesArray[x].startsWith('STAT ') || rolesArray[x].startsWith('IE ')) {
                let Role = msg.guild.roles.cache.find(role => role.name === rolesArray[x]);
                //for each memeber in the server
                Role.members.forEach((member, i) => { // Looping through the members of Role.
                    setTimeout(() => {
                        member.roles.remove(Role); // Removing the Role.
                    }, i * 1000);
                });
            }
        }

        // get all the users in the server
        //msg.guild.members.fetchMembers


        msg.channel.send("DONE...");

    } else {
        console.log("Current user cannot use this command");
        msg.channel.send("You cannot use this command");
    }
}