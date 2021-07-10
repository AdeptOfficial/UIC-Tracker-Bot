/**
 * @author Leland 'AdepT' Moy
 * @license AdeptProduction
 * @file config.js
 * @info config code for UIC Tracker Bot, all environment variables are BLOCKED with env
 */

require('dotenv').config();
// mongodb+srv://Tracker:Pz0VAqfeoeDy9hBz@tracker.sbezj.mongodb.net/Tracker?retryWrites=true&w=majority&ssl=true // process.env.MONGOPATH
// mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false
module.exports = { 
    "token" : process.env.BOTTOKEN,
    "ownerToken" : process.env.OWNERTOKEN,
    "prefix" : "!",
    "mongoPath" : "mongodb://localhost:27017/Tracker",
};
