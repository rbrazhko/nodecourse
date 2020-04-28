const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const UserModel = require('../models/user.model');

const { jwtSecretKey } = require('./config');

module.exports = (passport) => {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
        secretOrKey: jwtSecretKey
    };

    passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
        UserModel.findOne({_id: jwtPayload._id}, (err, user) => {
            if (err) { done(err, false); }
            if (user) { done(null, user); }
            done(null, false);
        });
    }));
};