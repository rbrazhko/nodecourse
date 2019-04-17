const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));

  res.render(
    'admin/add-product',
    {
      pageTitle: "Add Product",
      path: '/admin/add-product', // for PUG & EJS
      activeAddProduct: true, // for Handlebars
      productCss: true, // for Handlebars
      formsCss: true, // for Handlebars
    }
  );
};

exports.postAddProduct = (req, res, next) => {
  // console.log(req.query); // for GET parameters
  // console.log(JSON.stringify(req.body, null, 2)); // for POST parameters

  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const product = new Product(title, imageUrl, description, price);
  product.save();

  res.redirect('/');
};

exports.getProducts = (req, res, next) => { // Middleware
  Product.fetchAll((products) => {
    res.render(
      'admin/products', // Use template engine and render a template (shop.ejs)
      {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      }
    );
  });
};