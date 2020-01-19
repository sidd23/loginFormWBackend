const express = require('express');
const path = require('path');
// const mongoose = require('mongoose');

var userController = require(path.join(__dirname, "../controllers/userController"));

// User module(s)
// let Users = require('../models/users');
// let global = require(path.join(__dirname, '../global.json'));

// // Connect to DB
// mongoose.connect(global.db.uri,
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     }
// )
// .then(() => {
//     console.log('mongoose connected to MongoDB');
// },
//     err => {
//         console.log('mongoose connection to MongoDB failed');
//     });

// Declare router
var router = express.Router();

// // User defined functions
// var usernameExists = function(userName, callback) {
//     Users.countDocuments({username: userName}, function(err, count) {
//         if (err) {
//             throw new Error(err);
//         }
        
//         callback(count);
//     });
// };

// Routing

router.get('/', function(req, res) {
    res.set('Content-Type', 'text/html');
    res.send(path.join(__dirname, '../public/index.html'));
});

router.get('/login', userController.userLoginPage);

router.get('/users', userController.userList);

router.get('/signup', userController.userSignUpPage);

router.get('/profile/:id', userController.userInstanceDetail);

router.post('/check', userController.userInstanceExists);

router.post('/create', userController.userInstanceCreate);

// router.get('/users', function (req, res) {
//     // res.send(userRecords);
//     Users.find('-password', function(error, userRecords) {
//         res.send(userRecords);
//     });
// });

// router.get('/signup', function(req, res) {
//     res.sendFile(path.join(__dirname, '../public/signup.html'));
// });

// // router.get('/profile/:id', function(req, res) {
//     Users.findById(req.params.id, '-password')
//     .exec(function(error, userInstance) {
//         if (error) {
//             // throw new Error(error);
//             res.send("Invalid access!");
//         }
//         else if (userInstance == null) { // no results
//             res.send("User record/document does not exist!");
//         }
//         else {
//             res.send(userInstance);
//         }
//     });
// // });

// router.post('/check', function (req, res) {
//     Users.findOne({ username: req.body.username, password: req.body.password }, function (err, userInstance) {
//         if (err) {
//             next(err);
//         }
//         if (userInstance == null) { // no results
//             // res.send("User record/document does not exist!");
//             res.send(null);
//         }
//         else {
//             res.send(userInstance._id);
//         }
//     });
// });

// router.post('/create', function(req, res) {
//     // if (usernameExists(req.body.username)) {
//     //     res.send("username exists");
//     // }

//     usernameExists(req.body.username, function(count) {
//         if (count !== 0 || count == null) {
//             res.send("username exists");
//         }
//         else {
//             let user = new Users({
//                 firstName: req.body.firstName,
//                 familyName: req.body.familyName,
//                 username: req.body.username,
//                 password: req.body.password
//             });
        
//             user.save(function(error) {
//                 if (error) {
//                     res.send(null);
//                 }
        
//                 res.send(user._id);
//             });
//         }
//     });
// });

module.exports = router;