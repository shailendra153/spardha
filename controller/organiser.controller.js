const { response } = require('express');
const { request } = require('express');
const tournament=require('../model/tournament.model')
const { body,validationResult } = require('express-validator');
const Encrypter = require('../encrypter/encrupter');
const encrypter = new Encrypter('pratisparda');
const jwt = require('jsonwebtoken');

const transporter = require('../mail/mail');

const Organiser = require('../model/organiser.model');
const res = require('express/lib/response');

exports.verifyAccount=(request,response,next)=>{
    console.log(request.params);
    
    let organiserId=request.params.organiserId;
organiserId=encrypter.dencrypt(organiserId);
    Organiser.updateOne({_id:organiserId},{
        $set:{
            active:true
        }
    })
    .then(async result => {
        
        let organiser=await Organiser.findOne({_id:organiserId})
        console.log(organiser)
let message="Dear "+ organiser.name+" your verification has been completed Successfully.your Email is  "+organiser.email+" and your password is "+encrypter.dencrypt(organiser.password)+". Now you can procceed ahead byu clicking this link:-http://localhost:4200"
        console.log(message)
       const mailData = {
           from: 'kushwahshailendra732@gmail.com',
           to: organiser.email,
           subject: "Verification Success",
           text: message
   
       };
       transporter.sendMail(mailData, function(err, info) {
           if (err) {
               console.log(err)
               return response.status(500).json({ message: "Internal Server Error1" });

           } else
               return response.status(201).json({ message: "sucesss", result: result })
       });
    })
    .catch(err => {
            console.log(err);
            return response.status(500).json({ message: "Internal Server Error2" })
        }

    )


}


exports.organiserSignup = (request, response, next) => {
    console.log(request.body);
    const errors = validationResult(request);

    if (!errors.isEmpty())
    return response.status(400).json({ errors: errors.array() });
       
    const organiser = new Organiser();
    organiser.name = request.body.name;
    organiser.email = request.body.email;
    organiser.password = encrypter.encrypt(request.body.password);
    organiser.mobile = request.body.mobile;
    organiser.alternateNumber = request.body.alternateNumber;
    organiser.save()
    .then(result => {
        console.log(result);
        let id=result._id.toString();
        console.log(id)
    let    message="click this link for verify your account:-"+"https://spardhaa.herokuapp.com/organiser/verify/"+encrypter.encrypt(id);
         console.log(message)
        const mailData = {
            from: 'kushwahshailendra732@gmail.com',
            to: request.body.email,
            subject: "Sign Up Success",
            text: message
    
        };
        transporter.sendMail(mailData, function(err, info) {
            if (err) {
                console.log(err)
                return response.status(500).json({ message: "Internal Server Error" });

            } else
                return response.status(201).json({ message: "sucesss", result: result })
        });

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
            if(result.active==false)
            return response.status(200).json({message:"please verify your account"});
    
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

exports.signinWithGoogle= (request, response, next) => {
    console.log(request.body);
    Organiser.findOne({ email: request.body.email })
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

exports.updateProfile = (request, response, next) => {
    console.log(request.body)
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        console.log(errors)
        return response.status(400).json({ errors: errors.array() });
    }
    const name = request.body.name;
    const email = request.body.email;
  
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
    Organiser.findOne({ _id: request.params.organiserId}).populate('tournament')
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
exports.viewOrganiserList=(request,response,next)=>{
    Organiser.find({active:true})
    .then(result => {
        console.log(result);
        return response.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        return response.status(500).json({ message: "Internal Server Error" });
    })
}
