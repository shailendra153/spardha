const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        //minimum age
    },
    address: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    playerType: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    playedTournaments: [{
        type: Schema.Types.ObjectId,
        ref: 'tournaments'
    }],
    team: [{
        teamName: String,
        Status: String,
    }],
    requestedTeam:String,
    requestStatus:String,
    requestedTeamId:String,
    initialPrice:{
        type:Number,
        required:true
    }


});
module.exports = mongoose.model("players", playerSchema);