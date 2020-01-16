const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

// User module(s)
let userRecords = require(path.join(__dirname, '../queries.json'));
console.log(userRecords);
let global = require(path.join(__dirname, '../global.json'));

// Connect to DB
// console.log(global.db.uri);
mongoose.connect(global.db.uri, 
    {
        useNewUrlParser: true
    }
    ).then(() => {
        console.log('mongoose connected to MongoDB');
    },
    err => {
        console.log('mongoose connection to MongoDB failed');
    });

// Declare router
var router = express.Router();

// User defined functions
// Search if given username: password pair exists in userRecords
function search(username, password) {
    for(let i = 0; i < userRecords.length; i++) {
        if (userRecords[i].username === username && userRecords[i].password === password) {
            return true;
        }
    }
    return false;
}

// Schema Definitions

let userSchema = mongoose.Schema({
    _id: mongoose.SchemaTypes.ObjectId,
    username: String,
    password: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Model definitions

let User = mongoose.model("User", userSchema);


// Routing

router.get('/', function(req, res) {
    res.set('Content-Type', 'text/html');
    res.send(path.join(__dirname, '../public/index.html'));
});

router.get('/users', function (req, res) {
    res.send(userRecords);
});

router.get('/signup', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/signup.html'));
});

router.get('/profile', function (req, res) {
    // res.set('Content-Type', 'text/html');
    // res.send(path.join(__dirname, '../public/profile'));
    res.sendFile(path.join(__dirname, '../public/profile.html'));
})

router.post('/check', function(req, res) {
    console.log(req.body.username);
    let bExists = search(req.body.username, req.body.password);
    if(bExists) {
        res.send("Success");
    } else {
        res.send("Failed");
    }
});

router.post('/update', function(req, res) {
    console.log(req.body);
    if(req.body) {
        userRecords.push(req.body);
    }
    fs.writeFile(path.join(__dirname, '../queries.json'), JSON.stringify(userRecords), function(error) {
        if(error) {
            res.send("Failed to update.");
            throw error;
        }
        res.send("Success");
        console.log("Updated successfully.");
    });
});

module.exports = router;