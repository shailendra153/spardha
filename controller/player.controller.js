const Player = require('../model/player.model');
const { validationResult } = require('express-validator');
const Encrypter = require('../encrypter/encrupter');
const encrypter = new Encrypter('pratisparda');
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: "shailendra153",
    api_key: "934837375542371",
    api_secret: "zHeIVGAQP0FDhsmIV-a38EYA24w"
});

exports.playerSignin = (request, response, next) => {
    console.log(request.body);
    Player.findOne({ email: request.body.email })
        .then(result => {
            console.log(result);
            if (!result)
                return response.status(401).json({ message: "User Not Found" });
            let password = encrypter.dencrypt(result.password);
            if (password == request.body.password)
                return response.status(200).json(result);
            else
                return response.status(401).json({ message: "Wrong Password" })




        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ message: "Internal Server Error" });
        })
};
exports.playerSignup = async(request, response, next) => {
    console.log(request.body);
    const password = encrypter.encrypt(request.body.password);

    console.log(password)
    let image = ""
    await cloudinary.v2.uploader.upload(request.file.path)
        .then(result => {
            image = result.url;
        })
        .catch(err => {
            console.log(err)
        })
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(400).json({ errors: errors.array() });
    const player = new Player();
    player.name = request.body.name;
    player.age = request.body.age;
    player.address = request.body.address;
    player.mobile = request.body.mobile;
    player.email = request.body.email;
    player.password = password;
    player.playerType = request.body.playerType;
    player.image = image;
    player.description = request.body.description;
    player.save()
        .then(result => {
            console.log(result);
            return response.status(201).json(result);
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ message: "Internal Server Error" });
        })
};
exports.updateProfile = (request, response, next) => {
    //code here
};
exports.viewProfile = (request, response, next) => {
    console.log(request.body)
    Player.findOne({ _id: request.params.playerId })
        .then(result => {
            console.log(result);
            if (!result)
                return response.status(401).json({ message: "User Not Found" });
            result.password = encrypter.dencrypt(result.password);
            return response.status(200).json(result);

        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ message: "Internal Server Error" });
        })

};