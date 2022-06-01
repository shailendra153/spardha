const { response } = require('express');
const { request } = require('express');
const Admin = require('../model/admin.model');
const Player=require('../model/player.model')
const tournament=require('../model/tournament.model')
const Encrypter = require('../encrypter/encrupter');
const jwt = require('jsonwebtoken');
const encrypter = new Encrypter('pratisparda');


exports.adminSignin = (request, response, next) => {
    console.log(request.body);

    Admin.findOne({ email: request.body.email })
        .then(result => {
            console.log(result);
            if (!result)
                return response.status(200).json({ message: "User Not Found" });
            let password = encrypter.dencrypt(result.password);
            if (password == request.body.password){
                console.log(result);
                console.log('login Successful');
                let payload = { subject: result._id };
                let token = jwt.sign(payload, 'adkgshubhambahutsamjhhdarhkabhigaltinhikrteckjbgjkab');
                return response.status(201).json({
                    status: true,
                    result: result,
                    token: token
                });
            }
                
            else
                return response.status(200).json({ message: "Wrong Password" })

        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ message: "Internal Server Error" });
        })

};
exports.adminSignup = (request, response, next) => {
        console.log(request.body);
    const admin = new Admin();
    admin.email = request.body.email;
    admin.password = encrypter.encrypt(request.body.password);
    admin.save()
        .then(result => {
            console.log(result);
            return response.status(201).json(result);
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ message: "Internal Server Error" });
        })
};

exports.googleSignIn = (request, response, next) => {
    console.log(request.body);
    Admin.findOne({ email: request.body.email })
        .then(result => {
            console.log(result);
            if (!result)
                return response.status(200).json({ message: "User Not Found" });
                console.log(result);
                console.log('login Successful');
                let payload = { subject: result._id };
                let token = jwt.sign(payload, 'adkgshubhambahutsamjhhdarhkabhigaltinhikrteckjbgjkab');

                return response.status(201).json({
                    status: true,
                    result: result,
                    token: token
                });
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ message: "Internal Server Error" });
        })
};

exports.viewProfile = (request, response, next) => {
    console.log(request.body)
    Admin.findOne({ _id: request.params.adminId})
        .then(result => {
            console.log(result);
            if (!result)
                return response.status(200).json({ message: "User Not Found" });
            result.password = encrypter.dencrypt(result.password);
            return response.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ message: "Internal Server Error" });
        })
};


exports.viewTournament = (request, response, next) => {
    console.log(request.body);
    tournament.find().then(result=>{
        console.log(result);
        return response.status(201).json(result)
    }).catch(err=>{
        console.log(err);
        return response.status(500).json({err:err},{message:"internal server error"})
    })
};

