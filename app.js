// Node modules
const express = require('express')
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

// Custom app values
let globalVals = require(path.join(__dirname, './global.json'));

// Connect to DB
mongoose.connect(globalVals.db.uri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
.then(() => {
    console.log('mongoose connected to MongoDB');
},
    err => {
        console.log('mongoose connection to MongoDB failed');
    });

// Middleware configurations
const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routing
app.use('/', require(path.join(__dirname, './routes/routes')));

// Serve
app.listen(port, () => console.log(`Server (app) listening on port ${port}!`))