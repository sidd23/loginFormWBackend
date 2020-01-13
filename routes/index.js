const express = require('express');

const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

// User module(s)
let userRecords = require(path.join(__dirname, '../queries.json'));
console.log(userRecords);

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

router.get('/users', function (req, res) {
    res.send(userRecords);
});

router.post('/check', function(req, res) {
    console.log(req.body.username);
    let bExists = search(req.body.username, req.body.password);
    if(bExists) {
        res.send("Sucess");
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