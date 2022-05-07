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
     tournamentStartDate: {
         type: String,
         required: true
     },
     tpoutournament
     tournamentFees: {
         type: Number,
         required: true
     },
     tournamentRules: {
         type: Stirng

     },
     tournamentTeams: [{
         type: Schema.Types.ObjectId,
         ref: 'teams'
     }],



 });
 module.exports = mongoose.model("tournaments", tournamentSchema);