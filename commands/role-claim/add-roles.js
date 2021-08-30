require('module-alias/register')
const config = require("@root/config.js");
const fs = require('fs');
const path = require('path');

const addCommunityRole = (roleName) => {
    let rawdata = fs.readFileSync(path.resolve(__dirname, 'community-roles.json'));
    let data = JSON.parse(rawdata);
    data.communityRoles.push(roleName)
    fs.writeFileSync(path.resolve(__dirname, 'community-roles.json'), JSON.stringify(data), function(err) {
        if (err) throw err
        console.log("Updated community-roles.json");
    })
}

const addCourseRole = (roleName, roleCate) => {
    console.log(roleName)
}

const addProjectRole = (roleName) => {
    let rawdata = fs.readFileSync(path.resolve(__dirname, 'side-projects-roles.json'));
    let data = JSON.parse(rawdata);
    data.projectRoles.push(roleName)
    fs.writeFileSync(path.resolve(__dirname, 'side-projects-roles.json'), JSON.stringify(data), function(err) {
        if (err) throw err
        console.log("Updated side-projects-roles.json");
    })
}

const types = {
    'community': addCommunityRole,
    'course': addCourseRole,
    'project': addProjectRole,
}

module.exports = {
    name: 'addrole',
    aliases: ['addr'],
    expectedArgs: ["role name", "type of role"],
    permissions: 'OWNER',
    description: "Add roles to json file",
    // find the targeted bal user
    async execute (client, message, args, Discord, profileData, prefix) {
        if (message.author.id != config.ownerToken) {
            message.reply('You do not have permission to use this command!')
            return
        }

        if (!args.length) return message.reply('Please specify the new community role.')
        if (args.length > 3) return message.reply('Please specify the new community role and the type.')
        
        let roleName = args[0];
        let roleType =  args[1].toLowerCase();
        let roleCate = args[2];
        try {
            if (roleCate != undefined) {
                types[roleType](roleName, roleCate)
            } else {
                types[roleType](roleName)
            }

        } catch (err) {
            console.log('There was something wrong with adding the role.\n', err)
        }
    }
}