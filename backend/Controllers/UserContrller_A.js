const User_A=require("../Models/UserModel_A")

const getAllUsers = async(req,res,next)=>{

    let Users_A;


    //get all users
    try{
        Users_A=await User_A.find().sort({createdAt:-1});
    }catch(err){
        console.log(err);
    }

    //not found
    if(!Users_A){
        return res.status(404).json({message:"User Not Found"})
    }

    //diplay 
    return res.status(200).json({Users_A});

};

//data insert
const addUsers=async(req,res,next)=>{
    const{complain_id,customer_name,customer_email,customer_mobile,customer_address,issue_type,issue_date,description,employee_name,employee_email}=req.body;

    let users_A ;
    try{
        users_A=new User_A({complain_id,customer_name,customer_email,customer_mobile,customer_address,issue_type,issue_date,description,employee_name,employee_email});
        await users_A.save();
    }catch(err){
        console.log(err)
    }
    if(!users_A){
        return res.status(404).send({message:"Unable to add user"})
    }
    return res.status(200).json({users_A})

}

//get by id
const getById=async(req,res,next)=>{
    const id=req.params.id;
    let user_A;

    try{
        user_A=await User_A.findById(id);
    }catch(err){
        console.log(err);
    }
    if(!user_A){
        return res.status(404).send({message:"Unable to find user"})
    }
    return res.status(200).json({user_A})

}


//update
const updateUser_A=async(req,res,next)=>{
    const id=req.params.id;
    const{complain_id,customer_name,customer_email,customer_mobile,customer_address,issue_type,issue_date,description,employee_name,employee_email}=req.body;
    let users_A;
    try{
        users_A=await User_A.findByIdAndUpdate(id,{
            complain_id:complain_id,customer_name:customer_name,customer_email:customer_email,customer_mobile:customer_mobile,customer_address:customer_address,issue_type:issue_type,issue_date:issue_date,description:description,employee_name:employee_name,employee_email:employee_email
        });
        users_A=await users_A.save();
    }catch(erro){
        console.log(err)
    }
    if(!users_A){
        return res.status(404).send({message:"Unable to update user"})
    }
    return res.status(200).json({users_A})

}

//delete
const deleteUser=async(req,res,next)=>{
    const id= req.params.id;
    let user_A;
    try{
        user_A=await User_A.findByIdAndDelete(id)
    }catch(err){
        console.log(err)
    }
    if(!user_A){
        return res.status(404).send({message:"Unable to delete user"})
    }
    return res.status(200).json({user_A})
}


exports.getAllUsers=getAllUsers;
exports.addUsers=addUsers;
exports.getById=getById;
exports.updateUser_A=updateUser_A;
exports.deleteUser=deleteUser;