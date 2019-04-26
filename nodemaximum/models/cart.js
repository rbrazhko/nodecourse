const path = require('path');
const fs = require('fs');

const cartPath = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

class Cart {
  // constructor() {
  //   this.products = [];
  //   this.totalPride = 0;
  // }

  static addProduct(id, productPrice) {
    // Fetch the previous cart
    fs.readFile(cartPath, (err, fileContent) => {
      let cart = {products: [], totalPrice: 0};
      if (!err) {
        cart = JSON.parse(fileContent);
      }

      // Analyze the cart => Find existing quantity
      const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;

      // Add new product / increase quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct};
        updatedProduct.qty = existingProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }

      cart.totalPrice = cart.totalPrice + +productPrice;

      fs.writeFile(cartPath, JSON.stringify(cart), (err) => {
        if (err) {
          console.log('Error: Cart not saved', err);
        }
      });
    });
  }
}

module.exports = Cart;