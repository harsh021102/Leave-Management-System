const mongoose = require('mongoose');

const holidaySchema = new mongoose.Schema({
    holidayDate:  {
        type: Date,
        required: true
    },
    holidayName: {
        type: String,
        required: true,
        min: 1
    }
});

module.exports = mongoose.model('Holiday', holidaySchema);