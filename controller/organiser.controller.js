const { response } = require('express');
const { request } = require('express');
const tournament=require('../model/tournament.model')
const { body,validationResult } = require('express-validator');
const Encrypter = require('../encrypter/encrupter');
const encrypter = new Encrypter('pratisparda');

const Organiser = require('../model/organiser.model');
const res = require('express/lib/response');

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
    Organiser.findOne({ email: request.body.email })
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

exports.signinWithGoogle= (request, response, next) => {
    console.log(request.body);
    Organiser.findOne({ email: request.body.email })
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

exports.updateProfile = (request, response, next) => {
    console.log(request.body)
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        console.log(errors)
        return response.status(400).json({ errors: errors.array() });
    }
    const name = request.body.name;
    const email = request.body.email;
    // const password = encrypter.encrypt(request.body.password);
    const mobile = request.body.mobile;
    const alternateNumber = request.body.alternateNumber;
    Organiser.updateOne({ _id: request.body.organiserId },{
        $set: {
            name: name,
            mobile:mobile,
            email:email,
            alternateNumber:alternateNumber
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
    Organiser.findOne({ _id: request.params.organiserId})
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

exports.uploadTournament = (request, response, next) => {
          console.log(request.body);
          tournament.create(
            request.body
            // {
            //     orgainiserId:request.body.organiserId,
            //     tournamentName:request.body.tournamentName,
            //     tournamentTeamLimit:request.body.tournamentTeamLimit,
            //     tournamentAddress:request.body.tournamentAddress,
            //     tournamentStartDate:request.body.tournamentStartDate,
            //     tournamentEndDate:request.body.tournamentEndDate,
            //     tournamentFees:request.body.tournamentFees+" RS",
            //   }
          ).then(result=>{
              console.log(result);
              return response.status(201).json(result)
          }).catch(err=>{
              console.log(err);
              return response.status(500).json({err:err},{message:"internal server error"})
          })
        
};

exports.uploadTournament = (request, response, next) => {
    console.log(request.body);
    tournament.create(
      request.body
      // {
      //     orgainiserId:request.body.organiserId,
      //     tournamentName:request.body.tournamentName,
      //     tournamentTeamLimit:request.body.tournamentTeamLimit,
      //     tournamentAddress:request.body.tournamentAddress,
      //     tournamentStartDate:request.body.tournamentStartDate,
      //     tournamentEndDate:request.body.tournamentEndDate,
      //     tournamentFees:request.body.tournamentFees+" RS",
      //   }
    ).then(result=>{
        console.log(result);
        return response.status(201).json(result)
    }).catch(err=>{
        console.log(err);
        return response.status(500).json({err:err},{message:"internal server error"})
    })
  
};