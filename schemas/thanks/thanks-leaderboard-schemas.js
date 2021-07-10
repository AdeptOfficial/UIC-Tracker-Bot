const mongoose = require('mongoose')


// setup
const reqString = {
    type: String,
    required: true,
}

const thanksLeaderboardSchema = mongoose.Schema({
    // Guild ID
    _id: reqString,
    // leaderboard channel
    channelId: reqString
})

// export
module.exports = mongoose.model('thanks-leaderboards', thanksLeaderboardSchema)