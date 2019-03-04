const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/admin', adminRoutes); // filter routes (add prefix)
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404)
        .send('<h1>Page not found</h1>')
});

app.listen(3000);