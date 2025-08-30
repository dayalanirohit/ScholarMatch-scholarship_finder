const mongoose = require('mongoose');

const studentschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    course:{
        type:String
    },
    gpa:{
        type: Number
    },
    location:{
        type: String
    }
}, {timestamps: true}); 

module.exports = mongoose.model('student', studentschema);

