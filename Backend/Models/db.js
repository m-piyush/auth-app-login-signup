const mongoose = require("mongoose");

const mongo_url =  process.env.MONGO_CONN 
mongoose.connect(mongo_url)
    .then(() => {
        console.log("DATABASE connected ...");
    }).catch((error) => {
        console.log("MongoDB Connection ERROR",error);
    })