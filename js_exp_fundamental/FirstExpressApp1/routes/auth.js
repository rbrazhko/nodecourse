var express = require('express');
var router = express.Router();
var {jwtSecretKey} = require('../configs/config');
var jwt = require('jsonwebtoken');

var UserModel = require('../models/user.model');

var {notAuthorized, isLoggedIn} = require('../middlewares/authentication');

router.post('/signup', notAuthorized, (req, res, next) => {
    if (!req.body.username || !req.body.password) {
        return res.json({success: false, msg: 'Username and password are required'});
    }

    var newUser = new UserModel(req.body);

    newUser.save(function(err) {
        if (err) {
            return res.json({success: false, msg: 'Error: User wasn\'t saved'});
        }

        return res.status(200).send({success: true, msg: 'User successfully saved'});
    });
});

router.post('/login', isLoggedIn, (req, res, next) => {
    UserModel.findOne({username: req.body.username}, (err, user) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(401).send({success: false, msg: 'Authentication failed. User not found'});
        }

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (err || !isMatch) {
                return res.status(401).send({success: false, msg: 'Authentication failed. Wrong password'});
            }

            var token = jwt.sign({_id: user._id, username: user.username}, jwtSecretKey, {expiresIn: '1m'});
            return res.status(200).send({success: true, token: 'JWT ' + token});
        });

    });

});

router.post('/logout', isLoggedIn, (req, res, next) => {
    res.status(200).send({success: true});
});

module.exports = router;