const Leave = require('../models/leave');

const getAllLeaves = async (req,res) =>{
    try{
        const allLeaves = await Leave.find({});
        res.status(200).json({allLeaves});
    }catch(error){
        return res.status(500).json({error: error.message});
    }
}

const createLeave = async (req,res) =>{
    try{
        const leave = await Leave.create(req.body);
        res.status(201).json({leave});
    }
    catch(error){
        return res.status(500).json({error: error.message});
    }
    
}
const getLeave = async (req,res) =>{
    try{
        const {id:leaveId} = req.params;
        const leave = await Leave.findOne({_id: leaveId});
        if(!leave){
            return res.status(404).json({msg: `No leave with id ${leaveId}`});
        }
        res.status(200).json({leave});
    }
    catch(error){
        return res.status(500).json({error: error.message});
    }
}
const updateLeave = async (req,res) =>{
    try{
        const {id:leaveId} = req.params;
        const leave = await Leave.findOneAndUpdate({_id: leaveId } , req.body,{new:true, runValidators:true});
        if(!leave){
            return res.status(404).json({msg: `No leave with id ${leaveId}`});
        }
        res.status(200).json({leave});
    }
    catch(error){
        return res.status(500).json({error: error.message});
    }
}
const deleteLeave = async (req,res) =>{
    try{
        const {id:leaveId} = req.params;
        const leave = await Leave.findOneAndDelete({_id: leaveId});
        if(!leave){     
            return res.status(404).json({msg: `No leave with id ${leaveId}`});
        }
        res.status(200).json({msg: "Leave deleted successfully"});
    }catch(error){
        return res.status(500).json({error: error.message});
    }   
}

module.exports = {
    getAllLeaves,createLeave,
    updateLeave,deleteLeave,getLeave
}    