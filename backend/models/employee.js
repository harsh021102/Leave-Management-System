const mongoose = require('mongoose');
const employeeSchema = new mongoose.Schema({
    globalId:{
        type: String,
        required: true,
        unique: true
    },
    empName: {
        type: String,  
        required: true,
        minlength: 1
    },
    empEmail: {
        type: String,  
        required: true,
        match: /.+\@.+\..+/
    },
    gender: {
        type: String,   
        enum:["Male","Female","Other"],
        required: true
    },
    annualLeave: {
        type: Number,
        default: 12,
        required: true
    },
    casualLeave: {
        type: Number,
        default: 12,
        required: true
    },
    sickLeave: {
        type: Number,
        default: 12,
        required: true
    },
    managerName: {
        type: String,   
        required: true,
        minlength: 1
    },
    managerEmail: {
        type: String,   
        required: true,
        match: /.+\@.+\..+/
    },  
});
module.exports = mongoose.model('Employee', employeeSchema);