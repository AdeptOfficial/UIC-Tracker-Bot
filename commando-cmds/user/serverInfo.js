/**
 * @author Leland 'AdepT' Moy
 * @license AdeptProduction
 * @file serverInfo.js
 * @info sends an embed server info message
 */

const Commando = require('discord.js-commando')
const Discord = require("discord.js");
const client = new Discord.Client(
    {fetchAllMembers: true}
);
module.exports = class ServerInfo extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'serverinfo',
            aliases: ['server'],
            group: 'users',
            memberName: 'infomation',
            description: 'get info on current server'
        })
    }

    run = function (msg, tokens) {
        // get infomation to display
        const { guild } = msg
        const { name, region, memberCount} = guild
        const icon = guild.iconURL()
        const sendTime = msg.createdAt
        //console.log(name, region, memberCount)

        // building embed
        const embed = new Discord.MessageEmbed()
        .setTitle(`Server Info for "${name}"`)
        .setThumbnail(icon)
        .addFields(
            {
            name: 'Server Name',
            value: name,
        },
        {
            name: "Region",
            value: region,
        },
        {
            name: "Total Members",
            value: memberCount,
        },
        )
        .setFooter(`Last Updated: ${sendTime}`)
        .setColor('#00AAFF')

        // send embed message
        msg.channel.send(embed)
    }
}