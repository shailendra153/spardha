const { type } = require('express/lib/response');
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    ownerId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'players'
    },
    teamDetail: [{
        tournamentId: {
            type: Schema.Types.ObjectId,
            ref: 'tournaments'
        },
        players: [{

                type: Schema.Types.ObjectId,
                ref: 'players'
            }

        ]

    }],
    personalPlayer: {
        type: Number,
        default: 11
    },
    tournaments: [{
        type: Schema.Types.ObjectId,
        ref: 'tournaments'
    }],

});
module.exports = mongoose.model("teams", teamSchema);