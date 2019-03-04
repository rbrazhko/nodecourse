const path = require('path');

const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => { // Middleware
    console.log('Another middleware!');
//     next(); // Allows the request to continue in the next middleware in line
//     res.send(`<h1> Hello from express!!! </h1>`); // At the last middleware there must be res.send() instead of next()

    res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));
});

module.exports = router;