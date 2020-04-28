const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
// const expressHbs = require('express-handlebars');

const app = express();

// Register Handlebars
// files with 'handlebars' will be processed by template engine (can be renamed to 'hbs' for instance)
// app.engine('handlebars', expressHbs({
//     layoutsDir: 'views/layouts/',
//     defaultLayout: 'main-layout'
//     // , extname: 'hbs' // register file extension for layouts ('.handlebars' is used by default)
// }));
// app.set('view engine', 'handlebars');

// PUG is build-in template engine and can be just set
// app.set('view engine', 'pug'); // set global parameter | registration template engine

// EJS is also build-in
app.set('view engine', 'ejs');

app.set('views', 'views'); // path to views

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// return static files from public folder (for css)
app.use(express.static(path.join(__dirname, 'public')));

// parse application/json
app.use(bodyParser.json());

app.use('/admin', adminData.routes); // filter routes (add prefix)
app.use(shopRoutes);

app.use((req, res, next) => {
    // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));

    res.status(404).render('404', {pageTitle: "Page Not Found"});
});

app.listen(3000);