var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var config = require('../configs/config');

var userSchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created_date: Date
});

userSchema.pre('save', {query: true},  function(next) {
    var user = this;
    if (this.isNew) {
        user._id = mongoose.mongo.ObjectId();
        user.created_date = Date();
    }

    if (this.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(this.password, salt, null, (err, hashedPass) => {
                if (err) {
                    next(err);
                }

                this.password = hashedPass;
                next();
            });
        });
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function (pass, cb) {
  bcrypt.compare(pass, this.password, function(err, isMatch) {
    if (err) {
        return cb(err);
    }

    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);