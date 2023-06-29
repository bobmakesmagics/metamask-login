const express = require('express');
const routes = require('./routes'); // import the routes

const app = express();
const cors = require("cors");

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

let corsOptions = {
    origin: "*",
}

app.use(cors(corsOptions))

app.use(express.json());

app.use('/', routes); //to use the routes

const listener = app.listen(process.env.PORT || 4001, () => {
    console.log('Your app is listening on port ' + listener.address().port)
})