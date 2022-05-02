const { response } = require('express');
const { request } = require('express');
const { validationResult } = require('express-validator');
const Encrypter = require('../encrypter/encrupter');
const encrypter = new Encrypter('pratisparda');

const Organiser = require('../model/organiser.model');

exports.organiserSignup = (request, response, next) => {
    console.log(request.body);
    const organiser = new Organiser();
    organiser.name = request.body.name;
    organiser.email = request.body.email;
    organiser.password = encrypter.encrypt(request.body.password);
    organiser.mobile = request.body.mobile;
    organiser.alternateNumber = request.body.alternateNumber;
    organiser.save()
        .then(result => {
            console.log(result);
            return response.status(201).json(result);
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ message: "Internal Server Error" });
        })

};
exports.organiserSignin = (request, response, next) => {
    console.log(request.body);
    Org
};