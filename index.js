const express = require("express");
const app = express();
const mongoose = require("mongoose")
const morgan = require("morgan");


//Middleware
app.use(morgan("dev"));
app.use(express.json())

//Router
const infoRouter = require("./router");
app.use("/info",infoRouter);

//port
app.listen(8000,() => {
    console.log("Server port 8000")
})

//database
mongoose.connect("mongodb://localhost/crudapp", 

{ useNewUrlParser: true, useUnifiedTopology: true },(err) => {
    if(!err)
    {
        console.log("DB CONNECTED");
    }
})