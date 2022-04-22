require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser');
const app = express();

app.use(express.json({ extended: false }));
app.use(bodyParser.json()); // application/json 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});// to get access to the server from any domain like postman.
// Routes
app.use("/apiTest", require("./routes/TestRoutes"));

// Run the server
app.listen(process.env.PORT, () => console.log(`Server running in ${process.env.PORT}`));