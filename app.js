//  includes the required modules including express, mongoose, cors and dotenv.
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const route = require('./router');
require('dotenv').config();

// allowCrossDomain sets up CORS headers to allow cross-domain requests to the API.
let allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(bodyParser.urlencoded({ extended: false }));

// set up express middleware including cors, parsing of JSON and URL-encoded requests, and the allowCrossDomain function.
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))
app.use(allowCrossDomain)

app.use('/', route);

const PORT = process.env.PORT || 8000
try {
  mongoose.set('strictQuery', true);
  mongoose
    .connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("Successfully connected to MongoDB.");
      app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}.`);
      });
    })
    .catch(error => {
      console.error(error.message);
    });
  
} catch (error) {
  console.log(error.message);
}
