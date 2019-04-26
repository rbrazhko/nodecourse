const fs  = require('fs');
const path = require('path');

const savedProductsPath = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = (callback) => {
  fs.readFile(savedProductsPath, (err, fileContent) => {
    if (err) {
      return callback([]);
    }
    return callback(JSON.parse(fileContent));
  });
};


class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    // fs.createReadStream(); - for big files
    getProductsFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(prod => prod.id === this.id);
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;

        fs.writeFile(savedProductsPath, JSON.stringify(updatedProducts), (err) => {
          if (err) {
            console.log('Error on writing product to a file!');
            console.log(err);
          }
        });
      } else {
        this.id = Math.random().toString();

        products.push(this);
        fs.writeFile(savedProductsPath, JSON.stringify(products), (err) => {
          if (err) {
            console.log('Error on writing product to a file!');
            console.log(err);
          }
        });
      }
    });
  }

  static fetchAll(callback) {
    getProductsFromFile(callback);
  }

  static findById(id, callback) {
    getProductsFromFile((products) => {
      const product = products.find(p => p.id === id);

      callback(product);
    })
  }
}

module.exports = Product;