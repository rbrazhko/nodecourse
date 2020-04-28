const passport = require('passport');
const createError = require('http-errors');

const notAuthorized = (req, res, next) => {
    passport.authenticate('jwt', {session: false}, (err, isAuthenticated) => {
       if (err) { next(err) }
       if (isAuthenticated) { next(createError(403))}
       next();
    });
};

const isLoggedIn = (req, res, next) => {
    passport.authenticate('jwt', {session: false}, (err, isAuthenticated) => {
        if (err) { next(err) }
        if (!isAuthenticated) { next(createError(403))}
        next();
    });
};

module.exports = {
    notAuthorized,
    isLoggedIn
};