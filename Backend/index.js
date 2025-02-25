const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const AuthRouter = require('./Routes/AuthRouter')
const ProductRouter = require('./Routes/ProductRouter')
require('./Models/db')
require('dotenv').config();


const PORT = process.env.PORT || 8080;

app.get("/ping", (req, res) => {
    res.send("PING")
})
app.use(bodyParser.json());
app.use(cors());

app.use('/auth', AuthRouter)
app.use('/product', ProductRouter)

app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
})