const mongoose = require("mongoose");

const StackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        // unique: true,
        maxLength: 50
    },
    code: {
        type: String,
        required: true,
        // unique: true
    },
    status:{
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model("Stack", StackSchema);
