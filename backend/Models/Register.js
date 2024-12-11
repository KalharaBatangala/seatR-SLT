const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RegiSchema = new Schema({
    
    full_name : {
        type:String, //Data Type
        required:true, //Validate
    },
    email : {
        type:String, //Data Type
        required:true, //Validate
    },
    phone : {
        type:Number, //Data Type
        required:true, //Validate
    },
    password : {
        type:String, //Data Type
        required:true, //Validate
    },

    role:{
        type:String,
        default:"User"
    }
});

module.exports = mongoose.model(
    "UserRegister",//file name
    RegiSchema //function name
)