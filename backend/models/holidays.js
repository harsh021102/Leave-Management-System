const mongoose = require('mongoose');

const holidaySchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        default: function () {
            return `L-${Date.now()}`;
        },
    },
    // name: String
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