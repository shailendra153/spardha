const Player = require('../model/player.model');
const Team=require('../model/team.model');
const { validationResult } = require('express-validator');
const Encrypter = require('../encrypter/encrupter');
const encrypter = new Encrypter('pratisparda');
const cloudinary = require('cloudinary');
const { route } = require('../router/admin.router');
const jwt = require('jsonwebtoken');
const transporter = require('../mail/mail');
cloudinary.config({
    cloud_name: "shailendra153",
    api_key: "934837375542371",
    api_secret: "zHeIVGAQP0FDhsmIV-a38EYA24w"
});
const tournament=require('../model/tournament.model')

exports.playerSignin = (request, response, next) => {
    console.log(request.body);
    Player.findOne({ email: request.body.email })
        .then(result => {
            console.log(result);
            if (!result)
                return response.status(401).json({ message: "User Not Found" });
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

   let message='Congratulation Dear ' +request.body.name+" ,your Signaup proccess is complete Your email id is:-  "+request.body.email+" and your password is:- "+request.body.password;
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(400).json({ errors: errors.array() });
        const mailData = {
            from: 'kushwahshailendra732@gmail.com',
            to: request.body.email,
            subject: "Sign Up Success",
            text: message
    
        };    
        const player = new Player();
    player.name = request.body.name;
    player.age = 18;
    player.address = " ";
    player.mobile = request.body.mobile;
    player.email = request.body.email;
    player.password = password;
    player.playerType = request.body.playerType;
    player.image = " ";
    player.description = " ";
    player.requestedTeam=" ";
    player.requestedTeamId=" ";
    player.requestStatus=" ";
    player.save()
        .then(result => {
            console.log(result);
            transporter.sendMail(mailData, function(err, info) {
                if (err) {
                    console.log(err)
                    return response.status(500).json({ message: "Internal Server Error" });
        
                } else
                    return response.status(201).json({ message: "sucesss",result:result })
            });
        
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ message: "Internal Server Error" });
        })
};
exports.updateProfile = async (request, response, next) => {
    //code here
    let image="";
    let address="";
    let age=18;
    let description="";

    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        console.log(errors)
        return response.status(400).json({ errors: errors.array() });
    }
    if (request.file) {

        await cloudinary.v2.uploader.upload(request.file.path)
            .then(result => {
                image = result.url;
            })
            .catch(err => {
                console.log(err)
            })
    }
    const name=request.body.name;
    // player.age = 18;?
    // player.address = "";
     const mobile = request.body.mobile;
    const email = request.body.email;
    // player.password = password;
    const playerType = request.body.playerType;
    // player.image = "";
    // player.description = "";
    if(request.body.age)
        age=request.body.age

    if(request.body.address)
        address=request.body.address

    if(request.body.description)
        description=request.body.description

       Player.updateOne({ _id: request.body.playerId }, {
        $set: {
            name: name,
            image: image,
            address:address,
            mobile:mobile,
            email:email,
            playerType:playerType,
            description:description
        }
    })
    .then(result => {

        if (result.modifiedCount)
            return response.status(202).json({ message: "Success" });
        else
            return response.status(404).json({ message: "Not Found" })
    })
    .catch(err => {
            console.log(err);
            return response.status(500).json({ message: "Internal Server Error" })
        }

    )
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

exports.signinWithGoogle= (request, response, next) => {
    console.log(request.body);
    Player.findOne({ email: request.body.email })
        .then(result => {
            console.log(result);
            if (!result)
                return response.status(401).json({ message: "User Not Found" });
                console.log(result);
                console.log('login Successful');
                let payload = { subject: result._id };
                let token = jwt.sign(payload, 'adkgshubhambahutsamjhhdarhkabhigaltinhikrteckjbgjkab');

                return response.status(201).json({
                    status: true,
                    result: result,
                    token: token
                });
            // let password = encrypter.dencrypt(result.password);
            // if (password == request.body.password)
            //     return response.status(200).json(result);
            // else
            //     return response.status(200).json(result)
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ message: "Internal Server Error" });
        })
};

exports.viewTournaments= (request, response, next) => {
    console.log(request.body);
    tournament.find().then(result=>{
        console.log(result);
        return response.status(201).json(result)
    }).catch(err=>{
        console.log(err);
        return response.status(500).json({err:err},{message:"internal server error"})
    })
};
exports.requestForJoin=(request,response,next)=>{
console.log(request.params);
const playerId=request.params.playerId;
const teamName=request.params.teamName;
Player.updateOne({_id:playerId},
    {$set:{
        requestedTeam:teamName,
        requestedTeamId:request.params.teamId,
        requestStatus:"pending"
}})
.then(result => {

    if (result.modifiedCount)
        return response.status(202).json({ message: "Success" });
    else
        return response.status(404).json({ message: "Not Found" })
})
.catch(err => {
        console.log(err);
        return response.status(500).json({ message: "Internal Server Error" })
    }

)
};
exports.acceptRequest=async(request,response,next)=>{
   console.log(request.params);
   const playerId=request.params.playerId;
   Player.updateOne({_id:playerId},
    {$set:{
    
        requestStatus:"accepted"
}})
.then(async result => {
    console.log(result);
    const player=await Player.findOne({_id:playerId});
    const teamId=player.requestedTeamId;
    const team =await Team.findOne({_id:teamId});
    if(!team)
    return response.status(404).json({message:"Team Not Found"});
    team.players.push(playerId)
    team.save()
    .then(result => {
          console.log(result);
         player.team.push(teamId)
         player.save()
         .then(result => {
            return response.status(201).json({message:"success"});
        })
        .catch(err => {
            return response.status(500).json({ message: "Internal Server Error" });
        });
    })
    .catch(err => {
        console.log(err);
        return response.status(500).json({ message: "Internal Server Error" });
    });

})
.catch(err => {
        console.log(err);
        return response.status(500).json({ message: "Internal Server Error" })
    }

)
};