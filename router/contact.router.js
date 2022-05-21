const express=require('express');
const contactController=require('../controller/contact.controller');
const router=express.Router();
router.post("/contact",contactController.saveQuery);


module.exports=router;