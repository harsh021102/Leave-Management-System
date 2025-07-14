const Employee = require('../models/employee');
// Employees
const getAllEmployees = async (req, res) => {
    try {
        const allEmployees = await Employee.find({});
        res.status(200).json({ allEmployees });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
const createEmployee = async (req, res) => {
    // console.log(req.body);
    try {
        const employee = await Employee.create(req.body);
        res.status(201).json({ employee });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
const getEmployee = async (req, res) => {
    try {
        const { id: employeeID } = req.params;
        const employee = await Employee.findOne({ _id: employeeID });
        if (!employee) {
            return res.status(404).json({ msg: `No employee with id : ${employeeID}` });
        }
        res.status(200).json({ employee });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
const updateEmployee = async (req, res) => {
    try {
        const { id: employeeID } = req.params;
        const employee = await Employee.findOneAndUpdate({ _id: employeeID }, req.body, { new: true, runValidators: true });
        if (!employee) {
            return res.status(404).json({ msg: `No employee with id : ${employeeID}` });
        }
        res.status(200).json({ employee });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
const deleteEmployee = async (req, res) => {
    try {
        const { id: employeeID } = req.params;
        const employee = await Employee.findOneAndDelete({ _id: employeeID });
        if (!employee) {
            return res.status(404).json({ msg: `No employee with id:${employeeID}` });
        }
        res.status(200).json({ msg: "Employee deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};  
module.exports = {
    getAllEmployees,
    createEmployee,
    getEmployee,
    updateEmployee,
    deleteEmployee
};