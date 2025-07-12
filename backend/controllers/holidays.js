const Holiday = require('../models/holidays');
//Holidays
const getAllHolidays = async (req,res) =>{
    try{
        const allHolidays = await Holiday.find({});
        res.status(200).json({allHolidays});
    }catch(error){
        return res.status(500).json({error: error.message});
    }
}
const createHoliday = async (req,res) =>{
    try{
        const holiday = await Holiday.create(req.body);
        res.status(201).json({holiday});
    }
    catch(error){
        return res.status(500).json({error: error.message});
    }
}
const getHoliday = async (req,res) =>{
    try{
        const {id:holidayID} = req.params;
        const holiday = await Holiday.findOne({_id:holidayID});
        if(!holiday){
            return res.status(404).json({msg:`No holiday with id : ${holidayID}`});
        }
        res.status(200).json({holiday});
    }catch(error){
        return res.status(500).json({error: error.message});
}}
const updateHoliday = async (req,res) =>{
    try{
        const {id:holidayID} = req.params;
        const holiday = await Holiday.findOneAndUpdate({_id:holidayID},req.body,{new:true,runValidators:true});
        if(!holiday){   
            return res.status(404).json({msg:`No holiday with id : ${holidayID}`});
        }
        res.status(200).json({holiday});
    }catch(error){
        return res.status(500).json({error: error.message});  
    }
}
const deleteHoliday = async (req,res)=>{
    try{
        const {id:holidayID } = req.params;
        const holiday = await Holiday.findOneAndDelete({_id:holidayID});
        if(!holiday){
            return res.status(404).json({msg:`No holiday with id:${holidayID}`});
        }
        res.status(200).json({msg:"Holiday deleted successfully"});
    }catch(error){
        return res.status(500).json({error: error.message});
    }
}
module.exports = {
    getAllHolidays,createHoliday,getHoliday,updateHoliday,deleteHoliday
}    