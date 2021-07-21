/**
 * @author Leland 'AdepT' Moy
 * @license AdeptProduction
 * @file config.js
 * @info config code for UIC Tracker Bot, all environment variables are BLOCKED with env
 */

require('module-alias/register')
require('dotenv').config();

module.exports = { 
    "token" : process.env.BOTTOKEN,
    "ownerToken" : process.env.OWNERTOKEN,    
    "mongoPath" : process.env.MONGOPATH,
};
