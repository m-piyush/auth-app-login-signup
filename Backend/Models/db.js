const mongoose = require("mongoose");

const mongo_url = "mongodb+srv://piyush:piyush@cluster0.xejo7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongo_url)
    .then(() => {
        console.log("DATABASE connected ...");
    }).catch((error) => {
        console.log("MongoDB Connection ERROR",error);
    })