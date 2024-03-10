const User =require("../models/user");

async function handleGetAllUsers(req,res){
    const allDbUsers=await User.find({});
    return res.json(allDbUsers);
}

async function handleGetUserById(req,res){
    const user=await User.findById(req.params.id);
    if(!user) return res.status(404).json({error:"user not found"});
    return res.json(user);
}
async function handleUpdateById(req,res){
    await User.friendByIdAndUpdate(req.params.id, {lastName:"Changed"});
 return res.json({status : "success"});
}
async function handleDeleteByID(req,res){
    await User.findByIdAndDelete(req.params.id);
return res.json({ status: "Success" }) ;
}
async function handleCreateNewUser(req,res){
    const body=req.body;
    if(!body || !body.first_name || !body.last_name || !body.email || !body.Gender || !body.job_title){
        return res.status(400).json({msg:"All fields are reqs"});
    }
    const result =await User.create({
        firstName:body.first_name,
        lastName:body.last_name,
        email:body.email,
        gender:body.Gender,
        jobTitle:body.job_title,
    });
    return res.status(201).json({msg:"success"});
}
module.exports ={
    handleGetAllUsers,handleGetUserById,handleUpdateById,handleDeleteByID,handleCreateNewUser
}