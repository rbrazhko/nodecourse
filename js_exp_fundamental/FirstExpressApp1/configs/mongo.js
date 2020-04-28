var mongoose = require('mongoose');
var config = require('./config');

// const dbUri = 'mongodb://username:password@localhost/mydatabase';

const dbUri = config.mongo.uri;
const dbOptions = {
    user: config.mongo.user,
    pass: config.mongo.pass,
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(dbUri, dbOptions);

mongoose.connection.on('connected', () => {
    console.info('Mongo connected: ' + dbUri);
});

mongoose.connection.on('error', () => {
    console.info('Mongo error: ' + dbUri);
});

module.exports = mongoose;