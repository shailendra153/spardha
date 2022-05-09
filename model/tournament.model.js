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
     tournamentApplyDate: {
         type: String,
         required: true
     },
     tournamentEndDate: {
         type: String,
         required: true
     },
     tournamentFees: {
         type: Number,
         required: true
     },
     prizeAmount: {
         type: Number,
         required: true
     },
     tournamentRules: {
         type: String

     },
     tournamentTeams: [{
         type: Schema.Types.ObjectId,
         ref: 'teams'
     }],



 });
 module.exports = mongoose.model("tournaments", tournamentSchema);