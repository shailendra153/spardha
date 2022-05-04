const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true,
        trim: true
    },
    mobile: {
        type: Number,
        // required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        // required: true
    },
});
module.exports = mongoose.model("admins", adminSchema);