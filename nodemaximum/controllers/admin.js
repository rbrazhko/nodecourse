const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));

  res.render(
    'admin/edit-product',
    {
      pageTitle: "Add Product",
      path: '/admin/add-product', // for EJS
      editing: false
    }
  );
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }

  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;

  const updatedProduct = new Product(
    prodId,
    updatedTitle,
    updatedImageUrl,
    updatedDescription,
    updatedPrice
    );

  updatedProduct.save();
  res.redirect('/admin/products');
};

exports.postAddProduct = (req, res, next) => {
  // console.log(req.query); // for GET parameters
  // console.log(JSON.stringify(req.body, null, 2)); // for POST parameters

  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const product = new Product(null, title, imageUrl, description, price);
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