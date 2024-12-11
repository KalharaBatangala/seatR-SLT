const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    emp_id : {
        type:String, //Data Type            // Custom Employee ID field
        unique:true //Validate
    },
    emp_name : {
        type:String, //Data Type
        required:true, //Validate
    },
    emp_email : {
        type:String, //Data Type
        required:true, //Validate
    },
    emp_contact_no : {
        type:Number, //Data Type
        required:true, //Validate
    },
    emp_role : {
        type:String, //Data Type
        required:true, //Validate
    },
},{ timestamps: true });

// Custom ID generation function (Example: Prefix + Random 3-digit number)
function generateCustomEmployeeId() {
    const prefix = "EMP";
     // Generate a secure random 3-digit number (from 100 to 999)
  const randomNumber = crypto.getRandomValues(new Uint8Array(1))[0] % 900 + 100;
    return `${prefix}${randomNumber}`;
}

// Pre-save hook to assign a custom ID if it doesn't exist
EmployeeSchema.pre('save', function (next) {
    if (!this.emp_id) {
        this.emp_id = generateCustomEmployeeId(); // Generate and assign custom ID
    }
    next();
});

module.exports = mongoose.model(
    "EmployeeModel",//file name
    EmployeeSchema //function name
)