const Product = require('../models/product');

exports.getProducts = (req, res, next) => { // Middleware
//     next(); // Allows the request to continue in the next middleware in line
//     res.send(`<h1> Hello from express!!! </h1>`); // At the last middleware there must be res.send() instead of next()
//     console.log(adminData.products);
//
//     res.sendFile(path.join(rootDir, 'views', 'shop.html'));

  Product.fetchAll((products) => {
    res.render(
      'shop/product-list', // Use template engine and render a template (shop.ejs)
      {
        prods: products,
        pageTitle: 'Shop Products',
        path: '/shop/product-list'
      }
    );
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render(
      'shop/index',
      {
        prods: products,
        pageTitle: 'Shop',
        path: '/shop/index'
      }
    );
  });
};

exports.getCart = (req, res, next) => {
  res.render(
    'shop/cart',
    {
      path: '/shop/cart',
      pageTitle: 'Cart'
    }
  );
};

exports.getOrders = (req, res, next) => {
  res.render(
    'shop/orders',
    {
      path: '/shop/orders',
      pageTitle: 'Orders'
    }
  );
};

exports.getCheckout = (req, res, next) => {
  res.render(
    'shop/checkout',
    {
      path: '/shop/checkout',
      pageTitle: 'Checkout'
    }
  );
};