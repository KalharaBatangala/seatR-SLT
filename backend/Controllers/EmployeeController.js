const Employee = require("../Models/EmployeeModel");

//Display Employees
const getAllEmployees = async(req,res,next) => {
    let employees;

    //Get all Employees
    try{
        employees = await Employee.find().sort({createdAt:-1});
    }catch(err){
        console.log(err)
    }
    //not found
    if(!employees){
        return res.status(404).json({message:"Employees are not availble"})
    }

    //Display all Employees
    return res.status(200).json({employees});
};

//Data Insert (Add Employees)
const addEmployees = async(req,res,next) => {
    const {emp_name, emp_email, emp_contact_no, emp_role} = req.body;

    let employees;
    try{
        employees = new Employee({emp_name, emp_email, emp_contact_no, emp_role});
        await employees.save();
    }catch(err){
        console.log(err);
    }

    //not insert users
    if(!employees){
        return res.status(404).send({message: "Unable to add employees"});
    }
    return res.status(200).json({employees});
}

//Get Employee by ID
const getEmployeeById = async(req,res,next) => {
    const emp_id = req.params.emp_id;
    let employee;

    try{
        employee = await Employee.findOne({emp_id:emp_id});
    }catch(err){
        console.log(err);
    }
    if(!employee){
        return res.status(404).send({message: "Employee not Found"});
    }
    return res.status(200).json({employee});

}

//Update Employee Details
const updateEmployee  = async(req,res,next) => {
    const emp_id = req.params.emp_id;
    const {emp_name, emp_email, emp_contact_no, emp_role} = req.body;

    let employees;

    try{
        employees = await Employee.findOneAndUpdate({emp_id:emp_id}, {emp_name:emp_name, emp_email:emp_email, emp_contact_no:emp_contact_no, emp_role:emp_role}, { new: true });
        employees = await employees.save();
    }catch(err){
        console.log(err);
    }

    if(!employees){
        return res.status(404).send({message: "Unable to update the Employee Details"});
    }
    return res.status(200).json({employees});
}

//Delete Employee
const deleteEmployee = async(req, res, next) => {
    const emp_id = req.params.emp_id;
    let employee;

    try{
        employee = await Employee.findOneAndDelete({emp_id:emp_id});
    }catch(err){
        console.log(err);
    }

    if(!employee){
        return res.status(404).send({message: "Unable to Delete the Employee Details"});
    }
    return res.status(200).json({employee});
}

exports.getAllEmployees = getAllEmployees;
exports.addEmployees = addEmployees;
exports.getEmployeeById = getEmployeeById;
exports.updateEmployee = updateEmployee;
exports.deleteEmployee = deleteEmployee;