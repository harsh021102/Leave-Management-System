const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
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
        minlength: 1
    },
    userEmail: {
        type: String,
        required: true,
        match: /.+\@.+\..+/
    },
    leaveStatus: {
        type: String,   
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Leave', leaveSchema);