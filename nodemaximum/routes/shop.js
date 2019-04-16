const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => { // Middleware
    // console.log('Another middleware!');
//     next(); // Allows the request to continue in the next middleware in line
//     res.send(`<h1> Hello from express!!! </h1>`); // At the last middleware there must be res.send() instead of next()
//     console.log(adminData.products);
//
//     res.sendFile(path.join(rootDir, 'views', 'shop.html'));

    const products = adminData.products;
    res.render(
      'shop',
      {
          prods: products,
          pageTitle: 'Shop',
          path: '/', // for PUG & EJS
          hasProducts: products.length > 0, // for Handlebars
          activeShop: true,
          productCss: true
          // , layout: false // Prevent using default layout and render only view content (for Handlebars)
      }
    ); // Use template engine and render a template (shop.pug)
});

module.exports = router;