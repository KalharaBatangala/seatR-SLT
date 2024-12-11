const Complain = require("../Models/ComplainModel");

//Display Complains
const getAllComplains = async(req,res,next) => {
    let complains;

    //Get all complains
    try{
        complains = await Complain.find().sort({createdAt:-1});

    }catch(err){
        console.log(err)
    }
    //not found
    if(!complains){
        return res.status(404).json({message:"Complains cannot be found"})
    }

    //Display all complains
    return res.status(200).json({complains});
};

//Data Insert (Add Complain)
const addComplain = async(req,res,next) => {
    const {cus_name, cus_email, cus_address, cus_mobile_no, issue_type, description} = req.body;

    let complains;
    try{
        complains = new Complain({cus_name, cus_email, cus_address, cus_mobile_no, issue_type, description});
        await complains.save();
    }catch(err){
        console.log(err);
    }

    //not insert users
    if(!complains){
        return res.status(404).send({message: "Unable to add complain"});
    }
    return res.status(200).json({complains});
}

//Get Complain by ID
const getComplainById = async(req,res,next) => {
    const comp_id = req.params.comp_id;
    let complain;

    try{
        complain = await Complain.findOne({comp_id:comp_id});
    }catch(err){
        console.log(err);
    }
    if(!complain){
        return res.status(404).send({message: "Complain not Found"});
    }
    return res.status(200).json({complain});

}

//Update Complain Details
const updateComplain  = async(req,res,next) => {
    const comp_id = req.params.comp_id;
    const {cus_name, cus_email, cus_address, cus_mobile_no, issue_type, description,date,status} = req.body;

    let complains;

    try{
        complains = await Complain.findOneAndUpdate({comp_id:comp_id}, {cus_name:cus_name, cus_email:cus_email, cus_address:cus_address, cus_mobile_no:cus_mobile_no, issue_type:issue_type, description:description,date:date,status:status}, { new: true });
        complains = await complains.save();
    }catch(err){
        console.log(err);
    }

    if(!complains){
        return res.status(404).send({message: "Unable to update the Complain Details"});
    }
    return res.status(200).json({complains});
}

//Delete Complain
const deleteComplain = async(req, res, next) => {
    const comp_id = req.params.comp_id;
    let complain;

    try{
        complain = await Complain.findOneAndDelete({comp_id:comp_id});
    }catch(err){
        console.log(err);
    }

    if(!complain){
        return res.status(404).send({message: "Unable to Delete the Complain Details"});
    }
    return res.status(200).json({complain});
}


// Get all Complains to view from the user side
const getComplain = async (req, res) => {
    const email = req.query.email; // Get email from query parameters
    
        console.log("Fetching complaints for email:", email); // Debugging log
    
        try {
            const complaints = await Complain.find({ cus_email: email }).sort({createdAt:-1}); // Adjust the field name as necessary
            console.log("Complaints found:", complaints); // Debugging log
    
            if (complaints.length > 0) {
                return res.status(200).json(complaints);
            } else {
                return res.status(404).send('No complaints found');
            }
        } catch (error) {
            console.error("Error fetching complaints by email:", error); // Log the error to the console
            return res.status(500).send('Server Error');
        }
    
};

// Notifications for Complains

// Get the count of unviewed complaints
const unviewedCount = async (req, res) => {
    try {
        const count = await Complain.countDocuments({ viewed: false });
        return res.status(200).json({ count });
    } catch (err) {
        console.error("Error fetching unviewed complaints count:", err);
        return res.status(500).json({ message: "Error fetching unviewed complaints" });
    }
};

// Mark all complaints as viewed
const markAsViewed = async (req, res) => {
    try {
        await Complain.updateMany({ viewed: false }, { $set: { viewed: true } });
        return res.status(200).json({ message: "All complaints marked as viewed" });
    } catch (err) {
        console.error("Error marking complaints as viewed:", err);
        return res.status(500).json({ message: "Error marking complaints as viewed" });
    }
};

exports.getAllComplains = getAllComplains;
exports.addComplain = addComplain;
exports.getComplainById = getComplainById;
exports.updateComplain = updateComplain;
exports.deleteComplain = deleteComplain;
exports.getComplain = getComplain;
exports.unviewedCount = unviewedCount;
exports.markAsViewed = markAsViewed;