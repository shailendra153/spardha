const { response } = require('express');
const { request } = require('express');
const req = require('express/lib/request');
const Tournament = require('../model/tournament.model');
exports.uploadTournament = (request, response, next) => {
    console.log(request.body);
    const tournament = new Tournament();
    tournament.tournamentName = request.body.tournamentName;
    tournament.tournamentTeamLimit = request.body.tournamentTeamLimit;
    tournament.tournamentAddress = request.body.tournamentAddress;
    tournament.tournamentStartDate = request.body.tournamentStartDate;
    tournament.tournamentApplyDate = request.body.tournamentApplyDate;
    tournament.tournamentEndDate = request.body.tournamentEndDate;
    tournament.tournamentFees = request.body.tournamentFees;
    tournament.tournamentRules = request.body.tournamentRules;
    tournament.prizeAmount = request.body.prizeAmount;
    tournament.orgainiserId = request.body.orgainiserId;
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
    Tournament.findOne({ _id: request.params.tournamentId })
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
    Tournament.find({orgainiserId:request.params.organiserId})
    .then(result => {
        console.log(result);
        if (!result)
            return response.status(401).json({ message: "Tornaments Not Found" });
        
        return response.status(200).json(result);

    })
    .catch(err => {
        console.log(err);
        return response.status(500).json({ message: "Internal Server Error" });
    })


    
};
exports.viewTournamentList=(request,response,next)=>{
    Tournament.find()
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