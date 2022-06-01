 const Contact=require('../model/contact.model');
const { validationResult } = require('express-validator');

exports.saveQuery=(request,response,next)=>{
    console.log(request.body);
    const contact=new Contact();
    contact.name=request.body.name;
    contact.email=request.body.email;
    contact.mobile=request.body.mobile;
    contact.query=request.body.query;
    contact.save()
    .then(result => {
        return response.status(201).json(result);
    })
    .catch(err => {
        return response.status(500).json({ message: "Internal Server Error" });
    });


}