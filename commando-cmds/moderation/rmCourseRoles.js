/**
 * @author Leland 'AdepT' Moy
 * @license AdeptProduction
 * @file rmCourseRoles.js
 * @info Remove all courses roles from all trackers to be able to prepare for the new semester
 */

const Commando = require('discord.js-commando')
const config = require("../../config.js");
const Discord = require("discord.js");
const client = new Discord.Client(
    {fetchAllMembers: true}
);

module.exports = class RmCourseRoles extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'removecr',
            group: 'moderation',
            memberName: 'removingroles',
            description: 'Command to remove all course roles',
            args: [{
                key: 'test',
                prompt: 'Testing purposes?',
                oneOf: [ 'yes', 'no'],
                type: 'string',
            }]
        })
    }

    run = function (msg, { test }) {
        if (msg.author.id === config.ownerToken && test === 'no') {
            // get all the roles and store them in an array
            var rolesArray = [];
            msg.guild.roles.cache.each(roles => rolesArray.push(roles.name))
            //console.log(rolesArray);

            const arr_classCourseType = ["CS ", "MATH ", "STAT ", "IE "];
            // go through roles
            for (const x in rolesArray) {
                // replace all unnecessary characters in a roles 
                rolesArray[x].replace("'", " ");
                // confirmed courses roles
                // arr_classCourseType.indexOf(c => rolesArray[x].startsWith(c)) !== -1
                // arr_classCourseType.some(c => rolesArray[x].startsWith(c))
                // const index = arr_classCourseType.some(c => rolesArray[x].startsWith(c))
                // console.log(index)
                if (arr_classCourseType.some(c => rolesArray[x].startsWith(c))) {
                    let Role = msg.guild.roles.cache.find(role => role.name === rolesArray[x]);
                    //for each memeber in the server
                    Role.members.forEach((member, i) => { // Looping through the members of Role.
                        setTimeout(() => {
                            member.roles.remove(Role); // Removing the Role.
                        }, i * 60000);
                    });
                    msg.channel.send(`${Role} has been removed from all users`)
                }
            }
        } else if (msg.author.id === config.ownerToken && test === 'yes') {
            msg.channel.send('testing mode: ON')
            var rolesArray = [];
            msg.guild.roles.cache.each(roles => rolesArray.push(roles.name))

            msg.channel.send(rolesArray)
        } else {
            console.log("Current user cannot use this command");
            msg.channel.send("You cannot use this command");
        }
    }
}