const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const app = express();

// EJS is build-in template engine and can be just set
app.set('view engine', 'ejs');
app.set('views', 'views'); // path to views

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


// return static files from public folder (for css)
app.use(express.static(path.join(__dirname, 'public')));


// Router
app.use('/admin', adminRoutes); // filter routes (add prefix)
app.use(shopRoutes);
app.use(errorController.get404Page);

app.listen(3000);