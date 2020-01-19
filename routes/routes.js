const express = require('express');
const path = require('path');

var userController = require(path.join(__dirname, "../controllers/userController"));

// Declare router
var router = express.Router();

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

module.exports = router;