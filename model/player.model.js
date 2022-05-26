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
        unique:true
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
        tournamentId: {
            type: Schema.Types.ObjectId,
            ref: 'tournaments'
        },
        teamId: {
            type: Schema.Types.ObjectId,
            ref: 'teams'
        },
    }],
    request: [{
        tournamentId: {
            type: Schema.Types.ObjectId,
            ref: 'tournaments'
        },
        teamId: {
            type: Schema.Types.ObjectId,
            ref: 'teams'
        }
    }],
 
    initialPrice: {
        type: Number,
        required: true,
        default: 0
    },
    active:{
        type:Boolean,
        default:false
    }
});
module.exports = mongoose.model("players", playerSchema);