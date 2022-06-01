const { response } = require('express');
const { request } = require('express');
const Team = require('../model/team.model');

exports.createTeam = (request, response, next) => {
    console.log(request.body);

    const team = new Team();
    team.name = request.body.name;
    team.ownerId = request.body.ownerId;
    if (request.body.personalPlayer)
        team.personalPlayer = request.body.personalPlayer;
    else
        team.personalPlayer = 11;
    team.save()
        .then(result => {
            return response.status(201).json(result);
        })
        .catch(err => {
            return response.status(500).json({ message: "Internal Server Error" });
        });

}
exports.viewTeam=(request,response,next)=>{
    console.log(request.params);
    Team.findOne({_id:request.params.teamId})
    .then(result => {
        console.log(result);
        if (!result)
            return response.status(200).json({ message: "Team Not Found" });
        
        return response.status(200).json(result);

    })
    .catch(err => {
        console.log(err);
        return response.status(500).json({ message: "Internal Server Error" });
    })


    
};
exports.viewTeamList=(request, response, next) => {

    Team.find().then(result => {
        console.log(result);
        return response.status(201).json(result)
    }).catch(err => {
        console.log(err);
        return response.status(500).json({ err: err }, { message: "internal server error" })
    })
};
exports.viewTeamByOwnerId=(request,response,next)=>{
    console.log(request.params);
    Team.find({ownerId:request.params.ownerId}).populate("ownerId").populate('tournaments').exec()
    .then(result => {
        console.log(result);
        if (!result)
            return response.status(200).json({ message: "Team Not Found" });
        
        return response.status(200).json(result);

    })
    .catch(err => {
        console.log(err);
        return response.status(500).json({ message: "Internal Server Error" });
    })


    
};