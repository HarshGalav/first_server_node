const express = require('express');
const router=express.Router();
const {handleGetAllUsers,handleGetUserById,handleUpdateById,handleDeleteByID,handleCreateNewUser}=require("../controllers/user")

router.route("/")
.get(handleGetAllUsers)
.post(handleCreateNewUser);
router.route("/:id")
.get(handleGetUserById)
.delete(handleDeleteByID)
.patch(handleUpdateById);
module.exports=router;
