const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
    leaveId: {
        type: String,
        required: true,
        unique: true,
        default: function () {
    return `L-${Date.now()}`;
  },
    },
    // name: String
    startDate:  {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    leaveType: {
        type: String,
        enum: ["Sick Leave", "Casual Leave", "Annual Leave"],
        required: true
    },
    numOfDays: {
        type: Number,
        required: true,
        min: 1
    },
    reason: {
        type: String,
        required: true,
        minlength: 10
    },
});

module.exports = mongoose.model('Leave', leaveSchema);