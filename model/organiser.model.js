const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const organiserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        length: 10,
        required: true
    },
    alternateNumber: {
        type: Number,
        required: true
    },
    tournament: [{ 
        type: Schema.Types.ObjectId,
        ref: 'tournaments'
    }],
    active:{
        type:Boolean,
        default:false
    }
});
module.exports = mongoose.model("orgainisers", organiserSchema);