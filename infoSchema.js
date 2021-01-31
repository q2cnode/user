const mongoose = require("mongoose");

const infoSchema = mongoose.Schema({
    Title:{
        type:String,
        required:true,
    },
    Post:{
        type:String,
        required:true,
    },
    createdTime:
    {
        type:Date,
        default:Date.now
    }
    
})

module.exports = mongoose.model("Info", infoSchema);