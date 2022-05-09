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