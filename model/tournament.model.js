 const mongoose = require('mongoose');
 const { Schema } = require('mongoose');

 const tournamentSchema = new mongoose.Schema({
     orgainiserId: {
         type: Schema.Types.ObjectId,
         ref: 'orgainisers'
     },
     tournamentName: {
         type: String,
         required: true
     },
     tournamentTeamLimit: {
         type: Number,
         required: true
     },
     tournamentAddress: {
         type: String,
         required: true
     },
     tournamentDate: {
         type: String,
         required: true
     },
     tournamentTime: {
         type: String,
         required: true
     },
     tournamentStatus: {
         type: String,
         required: true
     },
     tournamentFees: {
         type: Number,
         required: true
     },
     tournamentTeams: [{
         type: Schema.Types.ObjectId,
         ref: 'teams'
     }],



 });
 module.exports = mongoose.model("tournaments", tournamentSchema);