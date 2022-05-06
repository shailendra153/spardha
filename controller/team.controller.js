const { response } = require('express');
const { request } = require('express');
const Team = require('../model/team.model');

exports.createTeam = (request, response, next) => {
    console.log(request.body);
    console.log("Success");
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