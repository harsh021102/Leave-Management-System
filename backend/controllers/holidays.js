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
module.exports = {
    getAllHolidays,createHoliday
}    