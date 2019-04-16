const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const products = [];

// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));

    res.render(
      'add-product',
      {
          pageTitle: "Add Product",
          path: '/admin/add-product', // for PUG & EJS
          activeAddProduct: true, // for Handlebars
          productCss: true, // for Handlebars
          formsCss: true, // for Handlebars
      }
    );
});

// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
    // console.log(req.query); // for GET parameters
    // console.log(JSON.stringify(req.body, null, 2)); // for POST parameters

    products.push({title: req.body.title});

    res.redirect('/');
});

exports.routes = router;
exports.products = products;
// module.exports = router;