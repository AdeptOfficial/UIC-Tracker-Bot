require('module-alias/register')
const fs = require('fs');
const path = require('path');


module.exports = (schedules) => {
    let editSchedules = {schedules}
    fs.writeFileSync(path.resolve(__dirname, 'schedules.json'), JSON.stringify(editSchedules), function(err) {
        if (err) throw err
    })
}