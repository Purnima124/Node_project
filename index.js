const express=require("express")
const { route } = require("express/lib/application")
const router=express.Router()
const userController=require("../controller/controller")

router.post("/insert",userController.CreateUser)
router.post("/login",userController.login)



module.exports=router



