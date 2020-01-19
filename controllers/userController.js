// node modules
const path = require('path');

// load controller
let Users = require(path.join(__dirname, "../models/users"));

// User defined functions
var usernameExists = function (userName, callback) {
    Users.countDocuments({ username: userName }, function (err, count) {
        if (err) {
            throw new Error(err);
        }

        callback(count);
    });
};

// Exports
exports.userList = function (req, res) {
    Users.find({}, '-password', function (error, userRecords) {
        res.send(userRecords);
    });
};

exports.userSignUpPage = function (req, res) {
    res.sendFile(path.join(__dirname, '../public/signup.html'));
};

exports.userLoginPage = function(req, res) {
    res.sendFile(path.join(__dirname, '../public/login.html'))
};

exports.userInstanceDetail = function (req, res) {
    Users.findById(req.params.id, '-password')
        .exec(function (error, userInstance) {
            if (error) {
                res.send("Invalid access!");
            }
            else if (userInstance == null) { // no results
                res.send("User record/document does not exist!");
            }
            else {
                res.send(userInstance);
            }
        });
};

exports.userInstanceExists = function (req, res) {
    Users.findOne({ username: req.body.username, password: req.body.password }, function (err, userInstance) {
        if (err) {
            next(err);
        }
        if (userInstance == null) { // no results
            res.send(null);
        }
        else {
            res.send(userInstance._id);
        }
    });
};

exports.userInstanceCreate = function (req, res) {
    usernameExists(req.body.username, function (count) {
        if (count !== 0 || count == null) {
            res.send("username exists");
        }
        else {
            let user = new Users({
                firstName: req.body.firstName,
                familyName: req.body.familyName,
                username: req.body.username,
                password: req.body.password
            });

            user.save(function (error) {
                if (error) {
                    res.send(null);
                }

                res.send(user._id);
            });
        }
    });
};
