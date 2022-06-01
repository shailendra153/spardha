const { response } = require('express');
const { request } = require('express');
const req = require('express/lib/request');
const Tournament = require('../model/tournament.model');
const cloudinary = require('cloudinary');
const { validationResult } = require('express-validator');
const Team =require('../model/team.model');

cloudinary.config({
    cloud_name: "shailendra153",
    api_key: "934837375542371",
    api_secret: "zHeIVGAQP0FDhsmIV-a38EYA24w"
});

exports.uploadTournament =async (request, response, next) => {
    console.log(request.body);
    let image = "";
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

    const tournament = new Tournament();
    tournament.tournamentName = request.body.tournamentName;
    tournament.tournamentTeamLimit = request.body.tournamentTeamLimit;
    tournament.tournamentAddress = request.body.tournamentAddress;
    tournament.tournamentStartDate = request.body.tournamentStartDate;
    tournament.tournamentApplyDate = request.body.tournamentApplyDate;
    tournament.tournamentEndDate = request.body.tournamentEndDate;
    tournament.tournamentFees = request.body.tournamentFees;
    tournament.tournamentRules = request.body.tournamentRules;
    tournament.firstPrize = request.body.firstPrize;
    tournament.secondPrize = request.body.secondPrize;
    tournament.thirdPrize = request.body.thirdPrize;

    tournament.orgainiserId = request.body.organiserId;
    tournament.banner=image;
    tournament.save()
        .then(result => {
            console.log(result)
            return response.status(201).json(result);
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ message: "Oops!Something Went Wrong" });

        })


};
exports.viewTournament = (request, response, next) => {
    console.log(request.params);
    Tournament.findOne({ _id: request.params.tournamentId }).populate('orgainiserId').populate('tournamentTeams').exec()
        .then(result => {
            console.log(result);
            return response.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ message: "OOps!Somthing Went Wrong" });
        })

};
exports.applyForTournament=async(request,response,next)=>{
    console.log(request.body);
    const teamId=request.body.teamId;
    const tournamentId=request.body.tournamentId;
    const tournament=await Tournament.findOne({_id:tournamentId});
    
    tournament.tournamentTeams.push(teamId);
    tournament.save()
    .then(async result=>{
        console.log(result);
        const team=await Team.findOne({_id:teamId});
        team.tournaments.push(tournamentId);
        team.save()
        .then(result=>{
            console.log(result);
            return response.status(200).json({message:"success"});

        })
        .catch(err=>{
            console.log(err);
            return response.status(500).json({message:"Oops!Something Went Wrong"})
        })

    })
    .catch(err=>{
        console.log(err);
        return response.status(500).json({message:"Oops!Something Went Wrong"})
    });


};
exports.viewTournamentByOrganiserId=(request,response,next)=>{
    console.log(request.params);
    Tournament.find({orgainiserId:request.params.organiserId}).populate('orgainiserId').populate('tournamentTeams').exec()
    .then(result => {
        console.log(result);
        if (!result)
            return response.status(200).json({ message: "Tornaments Not Found" });
        
        return response.status(200).json(result);

    })
    .catch(err => {
        console.log(err);
        return response.status(500).json({ message: "Internal Server Error" });
    })


    
};
exports.viewTournamentList=(request,response,next)=>{
    Tournament.find().populate('orgainiserId').populate('tournamentTeams').exec()
    .then(result=>{
        console.log(result);
        return response.status(200).json(result);

    }
 )
 .catch(err=>{
     console.log(err);
     return response.status(500).json({message:"Oops!Something Went Wrong"});
 })
}