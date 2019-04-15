const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// return static files from public folder (for css)
app.use(express.static(path.join(__dirname, 'public')));

// parse application/json
app.use(bodyParser.json());

app.use('/admin', adminRoutes); // filter routes (add prefix)
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3000);